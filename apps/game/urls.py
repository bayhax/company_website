# -*- coding:utf-8 -*-
# @Time: 5/15/20 7:47 PM
# @Author:bayhax
from django.urls import path
from apps.game import views
urlpatterns = [
    # path('game', views.GameView.as_view())
    path('game_video', views.stream_video),  # game页面视频
]