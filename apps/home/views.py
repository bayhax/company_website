import json
import os
import time

from PIL import Image
import matplotlib.pyplot as plt
from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import View
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
    # 图片
    file = request.FILES['file']
    data = {
        'error': True,
        'path': '',
    }
    if file:
        try:
            img = Image.open(file)
            filename = str(file)
            # print(img.size, img.mode, img.format)
            plt.imshow(img)
            img.save('./apps/home/static/media/upload/' + filename)
        except Exception as e:
            print(e)
        data['error'] = False
        data['location'] = ('../../../../../static/media/upload/%s' % filename)
    return HttpResponse(json.dumps(data), content_type="application/json")
