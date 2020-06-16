from django.db import models
import django.utils.timezone as timezone
from django.db.models import ImageField
from tinymce.models import HTMLField
# Create your models here.

from db.base_model import BaseModel


class News(BaseModel):
    """行业资讯表"""
    objects = models.Manager()
    title = models.CharField(max_length=50, verbose_name='标题')
    content = HTMLField(verbose_name='资讯内容')
    img = ImageField(upload_to='img/news')
    add_date = models.DateTimeField(default=timezone.now(), verbose_name='保存日期')
    mod_date = models.DateTimeField(auto_now=True, verbose_name='修改日期')

    class Meta:
        db_table = 'news'
        verbose_name = '行业资讯表'
        verbose_name_plural = verbose_name

