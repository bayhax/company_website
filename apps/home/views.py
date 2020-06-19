import json
import os
import time

from PIL import Image
import matplotlib.pyplot as plt
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import View

from news.models import News
# from numpy import unicode

# Create your views here.

# 首页


class IndexView(View):
    """首页"""

    def get(self, request):
        return render(request, 'index.html')

    def post(self, request):
        pass


# 家长监控
def supervisor(request):
    return render(request, 'supervisor.html')


# 纠纷处理
def dispute(request):
    return render(request, 'dispute.html')


# 上传图片
def upload_image(request):
    # 上传图片的内容
    file = request.FILES['file']
    # 获取资讯id
    news_id = request.META['HTTP_REFERER'].split('/')[6]
    data = {
        'error': True,
        'location': '',
    }
    filename = str(file)
    filename_new = filename
    if file:
        try:
            img = Image.open(file)
            # print(img.size, img.mode, img.format)
            # plt.imshow(img)
            if not os.path.exists('./apps/home/static/media/upload/%s' % news_id):
                os.mkdir('./apps/home/static/media/upload/%s' % news_id)
            num = 0
            while True:
                if filename_new not in os.listdir('./apps/home/static/media/upload/%s' % news_id):
                    break
                filename_new = filename.split('.')[0] + '_%d.' % num + filename.split('.')[1]
                num += 1
            img.save('./apps/home/static/media/upload/%s/%s' % (news_id, filename_new))
        except Exception as e:
            print(e)
        data['error'] = False
        data['location'] = ('../../../../../static/media/upload/%s/%s' % (news_id, filename_new))
    return HttpResponse(json.dumps(data), content_type="application/json; charset='utf-8'")

