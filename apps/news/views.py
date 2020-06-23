import json
from datetime import timedelta

from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views.generic import View
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage, InvalidPage
from django_redis import get_redis_connection

from news.models import News
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver


# Create your views here.
# 更新数据库中的数据后，发送信号，更改缓存
@receiver(post_save, sender=News)
def update_redis(sender, **kwargs):
    # 更新缓存
    news = kwargs['instance'].__dict__
    news_id = news['id']
    redis_conn = get_redis_connection('default')
    if redis_conn.exists('news:%d' % news_id):
        redis_conn.delete('news:%d' % news_id)
    redis_conn.hmset('news:%d' % news_id,
                     {'title': news['title'], 'content': news['content'], 'img': str(news['img']),
                      'mod_date': (news['mod_date'] + timedelta(hours=8)).strftime("%Y-%m-%d %H:%M"),
                      'add_date': (news['add_date'] + timedelta(hours=8)).strftime("%Y-%m-%d %H:%M")})


# 删除数据库中的数据后，发送信号，删除缓存
@receiver(post_delete, sender=News)
def delete_redis(sender, **kwargs):
    # 删除缓存
    news = kwargs['instance'].__dict__
    news_id = news['id']
    redis_conn = get_redis_connection('default')
    if redis_conn.exists('news:%d' % news_id):
        redis_conn.delete('news:%d' % news_id)


class NewsContentView(View):
    """游戏介绍首页"""

    def get(self, request):
        news_id = request.GET['news_id']
        news_id = int(news_id)
        # 先从缓存读取，如果没有，去数据库寻找，并且存入缓存。
        redis_conn = get_redis_connection('default')
        if redis_conn.exists('news:%d' % news_id):
            news = redis_conn.hmget('news:%d' % news_id, 'title', 'content', 'mod_date')
            return render(request, 'news.html', {'title': news[0].decode('utf-8'), 'content': news[1].decode('utf-8'),
                                                 'mod_date': news[2].decode('utf-8')})
        else:
            news = News.objects.get(id=news_id)
            redis_conn.hdel('news:%d' % news_id)
            redis_conn.hmset('news:%d' % news_id,
                             {'title': news.title, 'content': news.content,
                              'mod_date': (news.mod_date + timedelta(hours=8)).strftime("%Y-%m-%d %H:%M"),
                              'add_date': (news.add_date + timedelta(hours=8)).strftime("%Y-%m-%d %H:%M")})
            return render(request, 'news.html', {'title': news.title, 'content': news.content,
                                                 'mod_date': news.mod_date})

    def post(self, request):
        pass


class NewsMoreView(View):
    """查看更多"""

    def get(self, request):
        all_news = News.objects.all().values_list('mod_date', 'title', 'id', 'img')
        title = ['news_time', 'news_title', 'news_id', 'news_img']
        fina = []
        # 组json字符串(按表头字段)
        for news in all_news:
            info = [news[0].strftime('%m月%d日'), news[1], news[2], str(news[3])]
            temp = dict(zip(title, info))
            fina.append(temp)
        # 分页器，每页显示几条数据
        fina = fina * 10
        after_range_num = 2  # 当前页前显示 2 页
        before_range_num = 2  # 当前页后显示 2 页
        num_of_display_pages = 8  # 显示页数，num_of_display_pages > after_range_num + before_range_num + 1 + 2
        first = False  # 显示左边省略号
        last = False  # 显示右边省略号

        try:
            page = int(request.GET.get("page", 6))
            if page < 1:
                page = 1
        except ValueError:
            page = 1
        # 每页显示6个
        paginator = Paginator(fina, 6)
        # 一共有几页
        count = paginator.count
        try:
            news_data = paginator.page(page)
        except(EmptyPage, InvalidPage, PageNotAnInteger):
            news_data = paginator.page(1)
        # 总页数小于等于显示页数时，则将总页数全部显示
        if paginator.num_pages <= num_of_display_pages:
            page_range = range(1, paginator.num_pages + 1)
        # 第一种情况， 后面页数显示不全
        elif news_data.number <= num_of_display_pages - after_range_num - 2:
            last = True
            page_range = range(1, news_data.number + after_range_num + 1)
        # 第二种情况， 两边页数显示不全
        elif num_of_display_pages - after_range_num - 2 < news_data.number < paginator.num_pages - after_range_num - 2:
            first = True
            last = True
            page_range = range(news_data.number - before_range_num, news_data.number + after_range_num + 1)
        # 第三种情况， 前边页数显示不全
        else:
            first = True
            page_range = range(news_data.number - before_range_num, paginator.num_pages + 1)

        return render(request, 'news_more.html', {'news_data': news_data, 'page_range': page_range, 'count': count,
                                                  'first': first, 'last': last})

    def post(self, request):
        pass


class NewsTitleView(View):
    def get(self, request):
        return redirect('/home/index#news')

    def post(self, request):
        # 最新的五则资讯
        all_title = []
        all_img = []
        all_id = []
        if News.objects.count() >= 5:
            all_news = News.objects.order_by('id').reverse()[:5]
        else:
            all_news = News.objects.all()
        for news in all_news:
            all_title.append(news.title)
            all_img.append(str(news.img))
            all_id.append(news.id)
        return HttpResponse(json.dumps({'title': all_title, 'img': all_img, 'id': all_id}))
