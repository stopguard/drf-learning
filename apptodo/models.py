from django.contrib.auth import get_user_model
from django.db import models


class Project(models.Model):
    name = models.CharField('Название', max_length=128)
    git_link = models.URLField('Ссылка на репозиторий', blank=True)
    users = models.ManyToManyField(get_user_model(), verbose_name='Пользователи')

    def __str__(self):
        return f'{self.name}'


class ToDo(models.Model):
    project = models.ForeignKey(Project, models.CASCADE, verbose_name='Связанный проект')
    creator = models.ForeignKey(get_user_model(), models.CASCADE, verbose_name='Автор')
    body = models.TextField('Текст задачи')
    is_active = models.BooleanField('Активна', default=True)
    created_d = models.DateField('Создана', auto_now_add=True)
    updated_d = models.DateField('Обновлена', auto_now=True)
