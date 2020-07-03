# -*- coding:utf-8 -*-
# @Time: 7/3/20 4:27 PM
# @Author:bayhax
from django.conf import settings


def imgurl(request):
    url = "https://company-website-1253454674.cos.ap-beijing.myqcloud.com/img/"
    context = {'hide_title': url + "hide_title.png", 'index_name_logo': url + "index_name_logo.png",
               'name_logo': url + "name_logo.png", 'game_video': url + "game_video.png",
               'game_dinosaur': url + "game_dinosaur.png", 'PageDown': url + "PageDown.png",
               'bg_1': url + "bg_1.png", 'bg_2': url + "bg_2.png", 'bg_3': url + "bg_3.png",
               'bg_4': url + "bg_4.png", 'Logo': url + "Logo.png", 'licence': url + 'licence.png',
               'credit': url + "credit.png",
               'show_video': "https://game-website-1253454674.cos.ap-beijing.myqcloud.com/show_video.mp4"}
    return context
