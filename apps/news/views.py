from django.shortcuts import render
from django.views.generic import View
# Create your views here.


class NewsView(View):
    """游戏介绍首页"""

    def get(self, request):
        return render(request, 'news.html')

    def post(self, request):
        pass