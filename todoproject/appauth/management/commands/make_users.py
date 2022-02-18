from django.contrib.auth import get_user_model
from django.core.management import BaseCommand
from django.db.models import Q


class Command(BaseCommand):
    def handle(self, *args, **options):
        counter = 0
        count = options.get('count', 10)
        for i in range(count):
            username = f'username{i:0>3}'
            email = f'{username}@mail.ru'
            first_name = f'name {i:0>3}'
            last_name = f'surname {i:0>3}'
            if not get_user_model().objects.filter(Q(username=username) | Q(email=email)).exists():
                get_user_model().objects.create_user(username, email, f'password{email}',
                                                     first_name=first_name, last_name=last_name)
                counter += 1
                print(f'User {username} created')
            else:
                print(f'User {username} already is exists, or email {email} is already exists')
        print(f'{counter} users created')

    def add_arguments(self, parser):
        parser.add_argument(
            nargs='?',
            type=int,
            default=10,
            dest='count'
        )
