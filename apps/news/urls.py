# -*- coding:utf-8 -*-
# @Time: 5/15/20 7:48 PM
# @Author:bayhax
from django.urls import path
from apps.news import views
urlpatterns = [
    path('news_content', views.NewsView.as_view()),
    path('news_control', views.NewsControlView.as_view())
]