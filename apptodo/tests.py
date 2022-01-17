from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from mixer.backend.django import mixer

from apptodo.models import Project
from apptodo.views import ProjectModelViewSet


class TestProjectModelViewSet(TestCase):
    def setUp(self):
        self.user1 = get_user_model().objects.create_user(
            'user1', 'user1@user.mail', 'rasdvatri'
        )
        self.user2 = get_user_model().objects.create_user(
            'user2', 'user2@user.mail', 'rasdvatri'
        )
        self.user3 = get_user_model().objects.create_user(
            'user3', 'user3@user.mail', 'rasdvatri'
        )

    def test_unauthorized_get_list(self):
        factory = APIRequestFactory()
        print('\nunauthorized get check')
        request = factory.get('/api/project/')
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_unauthorized_create(self):
        factory = APIRequestFactory()
        project = {'name': 'project1',
                   'git_link': '',
                   'users': [1, 2, 3]}
        print('\nunauthorized post check')
        request = factory.post('/api/project/',
                               project)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_authorized_get_list(self):
        factory = APIRequestFactory()
        print('\nauthorized get check')
        request = factory.get('/api/project/')
        force_authenticate(request, self.user1)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self):
        factory = APIRequestFactory()
        project = {'name': 'project1',
                   'git_link': '',
                   'users': [1, 2, 3]}
        print('\nauthorized post check')
        request = factory.post('/api/project/',
                               project)
        force_authenticate(request, self.user1)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        client = APIClient()
        project = mixer.blend(Project)
        client.login(username='user1', password='rasdvatri')
        print('\nget detail check')
        response = client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class APITestProjectModelViewSet(APITestCase):
    def setUp(self):
        self.user1 = get_user_model().objects.create_user(
            'user1', 'user1@user.mail', 'rasdvatri'
        )
        self.user2 = get_user_model().objects.create_user(
            'user2', 'user2@user.mail', 'rasdvatri'
        )
        self.user3 = get_user_model().objects.create_user(
            'user3', 'user3@user.mail', 'rasdvatri'
        )
        self.user4 = get_user_model().objects.create_user(
            'user4', 'user4@user.mail', 'rasdvatri'
        )
        self.user5 = get_user_model().objects.create_user(
            'user5', 'user5@user.mail', 'rasdvatri'
        )
        self.superuser = get_user_model().objects.create_superuser(
            'superuser', 'superuser@user.mail', 'rasdvatri'
        )

    def test_put(self):
        project = mixer.blend(Project)
        self.client.login(username='superuser', password='rasdvatri')
        print('\nput detail check')
        print(f'project: {project}')
        print(f'project.git_link: {project.git_link}')
        print(f'project.users {project.users}')
        response = self.client.put(f'/api/projects/{project.id}/',
                                   {'name': 'абвгдёж', 'git_link': project.git_link, 'users': [1, 2, 3]})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(pk=project.pk)
        self.assertEqual(project.name, 'абвгдёж')
