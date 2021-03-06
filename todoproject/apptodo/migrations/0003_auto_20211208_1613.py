# Generated by Django 2.2.10 on 2021-12-08 16:13

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apptodo', '0002_auto_20211208_1608'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='git_link',
            field=models.URLField(blank=True, verbose_name='Ссылка на репозиторий'),
        ),
        migrations.AlterField(
            model_name='project',
            name='name',
            field=models.CharField(max_length=128, verbose_name='Название'),
        ),
        migrations.AlterField(
            model_name='project',
            name='users',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL, verbose_name='Пользователи'),
        ),
    ]
