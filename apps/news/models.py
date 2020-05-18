from django.db import models

# Create your models here.

from db.base_model import BaseModel


class News(BaseModel):
    """行业资讯表"""
    objects = models.Manager()
    title = models.CharField(max_length=50, verbose_name='标题')
    content = models.TextField(verbose_name='资讯内容')

    class Meta:
        db_table = 'news'
        verbose_name = '行业资讯表'
        verbose_name_plural = verbose_name

