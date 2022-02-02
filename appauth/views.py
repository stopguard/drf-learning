from django.contrib.auth import get_user_model
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.viewsets import GenericViewSet

from appauth.serializers import CustomUserSerializer, CustomUserSerializerV0002


class CustomUserModelViewSet(ListModelMixin, RetrieveModelMixin,
                             UpdateModelMixin, GenericViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = CustomUserSerializer

    def get_serializer_class(self):
        print('API version', self.request.version)
        if self.request.version == '0.2':
            return CustomUserSerializerV0002
        return CustomUserSerializer
