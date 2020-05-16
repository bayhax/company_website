# -*- coding:utf-8 -*-
# @Time: 5/15/20 7:47 PM
# @Author:bayhax
from django.urls import path
from apps.about import views
urlpatterns = [
    path('about', views.AboutView.as_view())
]