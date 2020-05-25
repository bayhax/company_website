from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import View
from news.models import News
import json


# Create your views here.


class NewsView(View):
    """游戏介绍首页"""

    def get(self, request):
        news_id = request.GET['news_id']
        news = News.objects.get(id=news_id)
        return render(request, 'news.html', {'title': news.title, 'content': news.content, 'mod_date': news.mod_date})

    def post(self, request):
        return HttpResponse(json.dumps({'bingo': 'bingo'}))


class NewsControlView(View):
    """游戏资讯后台编辑页面"""
    def get(self, request):
        return render(request, 'news_control.html')
