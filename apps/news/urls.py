# -*- coding:utf-8 -*-
# @Time: 5/15/20 7:48 PM
# @Author:bayhax
from django.urls import path
from apps.news import views
urlpatterns = [
    path('news_content', views.NewsContentView.as_view()),  # 点击图片后新闻内容
    path('news_more', views.NewsMoreView.as_view()),  # 查看更多
    path('news_title', views.NewsTitleView.as_view()),  # 资讯标题
]