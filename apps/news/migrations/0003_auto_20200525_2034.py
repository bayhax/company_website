# Generated by Django 3.0.6 on 2020-05-25 12:34

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0002_auto_20200525_1740'),
    ]

    operations = [
        migrations.AddField(
            model_name='news',
            name='add_date',
            field=models.DateTimeField(default=datetime.datetime(2020, 5, 25, 12, 34, 57, 300856, tzinfo=utc), verbose_name='保存日期'),
        ),
        migrations.AddField(
            model_name='news',
            name='mod_date',
            field=models.DateTimeField(auto_now=True, verbose_name='修改日期'),
        ),
    ]
