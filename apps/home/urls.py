# -*- coding:utf-8 -*-
# @Time: 5/15/20 7:27 PM
# @Author:bayhax
from django.urls import path
from apps.home import views
urlpatterns = [
    path('index', views.IndexView.as_view()),  # 首页
]
