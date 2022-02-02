from rest_framework.viewsets import ModelViewSet

from apptodo.models import Project, ToDo
from apptodo.serializers import ProjectSerializer, ToDoSerializer


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
