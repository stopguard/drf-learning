from django.contrib.auth import get_user_model
from django.core.management import BaseCommand
from django.db.models import Q


class Command(BaseCommand):
    def handle(self, *args, **options):
        if not get_user_model().objects.filter(Q(username='django') | Q(email='django@drf.ru')).exists():
            get_user_model().objects.create_superuser('django', 'django@drf.ru', 'geekshop',
                                                      first_name='django', last_name='su')
            print('Standard super user created')
        else:
            print('Standard super user is exists, or standard super user email is already exists')
