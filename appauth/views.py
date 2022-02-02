from django.contrib.auth import get_user_model
from rest_framework.viewsets import ModelViewSet

from appauth.serializers import CustomUserSerializer


class CustomUserModelViewSet(ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = CustomUserSerializer
