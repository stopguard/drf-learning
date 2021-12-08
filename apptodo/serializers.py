from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import ModelSerializer

from appauth.models import CustomUser
from apptodo.models import Project, ToDo


class ProjectSerializer(ModelSerializer):
    users = PrimaryKeyRelatedField(many=True, queryset=CustomUser.objects.all())

    class Meta:
        model = Project
        fields = '__all__'


class ToDoSerializer(ModelSerializer):

    class Meta:
        model = ToDo
        fields = '__all__'
