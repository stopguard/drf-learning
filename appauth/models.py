from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from todoproject.mixins import OrderingByIdMixin


class CustomUser(OrderingByIdMixin, AbstractUser):
    email = models.EmailField(_('email address'), unique=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
