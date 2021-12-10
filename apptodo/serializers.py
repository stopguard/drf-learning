from rest_framework.relations import PrimaryKeyRelatedField, StringRelatedField
from rest_framework.serializers import ModelSerializer

from apptodo.models import Project, ToDo


class ProjectSerializer(ModelSerializer):
    users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoSerializer(ModelSerializer):
    creator = StringRelatedField()
    project = StringRelatedField()

    class Meta:
        model = ToDo
        fields = '__all__'