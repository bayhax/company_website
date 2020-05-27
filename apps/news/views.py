from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import View
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage, InvalidPage

from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from datetime import timedelta
from news.models import News
from django_redis import get_redis_connection


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
                     {'title': news['title'], 'content': news['content'],
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
        if 'm' in news_id:
            news_id = int(news_id[:-1])
        else:
            all_news = News.objects.order_by('id').reverse()[:4]
            news_id = all_news[int(request.GET['news_id'])].id
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
        all_news = News.objects.all().values_list('mod_date', 'title', 'id')
        title = ['news_time', 'news_title', 'news_id']
        fina = []
        # 组json字符串(按表头字段)
        for news in all_news:
            info = [news[0].strftime('%Y-%m-%d'), news[1], news[2]]
            temp = dict(zip(title, info))
            fina.append(temp)
        # 分页器，每页显示几条数据
        paginator = Paginator(fina, 6)
        # template中的模板变量
        page = request.GET.get('page')
        try:
            news_data = paginator.page(page)
        # 如果返回的不是整数
        except PageNotAnInteger:
            news_data = paginator.page(1)
        # 如果返回的是空
        except EmptyPage:
            news_data = paginator.page(paginator.num_pages)
        # 如果返回的无效页码
        except InvalidPage:
            return HttpResponse('找不到页面')

        return render(request, 'news_more.html', {'news_data': news_data})

    def post(self, request):
        pass
