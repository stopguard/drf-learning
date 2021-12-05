from django.contrib.auth import get_user_model
from django.core.management import BaseCommand
from django.db.models import Q


class Command(BaseCommand):
    def handle(self, *args, **options):
        counter = 0
        for i in range(10):
            username = f'username{i:0>2}'
            email = f'{username}@mail.ru'
            first_name = f'name {i:0>2}'
            last_name = f'surname {i:0>2}'
            if not get_user_model().objects.filter(Q(username=username) | Q(email=email)).exists():
                get_user_model().objects.create_superuser(username, email, f'password{email}',
                                                          first_name=first_name, last_name=last_name)
                counter += 1
                print(f'User {username} created')
            else:
                print(f'User {username} already is exists, or email {email} is already exists')
            print(f'{counter} user created')
