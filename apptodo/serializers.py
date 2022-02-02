from rest_framework.relations import PrimaryKeyRelatedField, StringRelatedField
from rest_framework.serializers import ModelSerializer

from appauth.serializers import CustomUserSerializer
from apptodo.models import Project, ToDo


class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class ProjectGetSerializer(ProjectSerializer):
    users = CustomUserSerializer(many=True)


class ToDoSerializer(ModelSerializer):
    class Meta:
        model = ToDo
        fields = '__all__'


class ToDoGetSerializer(ToDoSerializer):
    creator = CustomUserSerializer()
    project = ProjectSerializer()
