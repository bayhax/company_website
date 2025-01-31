"""company_website URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, re_path, include

from company_website import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('tinymce', include('tinymce.urls')),  # 富文本编辑器
    path('game/', include('game.urls')),  # 游戏介绍
    path('news/', include('news.urls')),  # 行业资讯
    path('about/', include('about.urls')),  # 关于我们
    re_path(r'^', include('home.urls')),  # 官网首页
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
