from graphene import ObjectType, Schema, List, Field, Int
from graphene_django import DjangoObjectType

from appauth.models import CustomUser
from apptodo.models import Project, ToDo


class UserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'first_name', 'last_name', 'email',
                  'is_superuser', 'is_staff', 'project_set', 'todo_set')
        # fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class Query(ObjectType):
    all_users = List(UserType)
    user_by_id = Field(UserType, id=Int(required=True))
    all_projects = List(ProjectType)
    project_by_id = Field(ProjectType, id=Int(required=True))
    all_to_dos = List(ToDoType)
    to_do_by_id = Field(ToDoType, id=Int(required=True))

    def resolve_all_users(root, info):
        return CustomUser.objects.all()

    def resolve_user_by_id(root, info, id):
        return CustomUser.objects.filter(id=id).first()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_project_by_id(root, info, id):
        return Project.objects.filter(id=id).first()

    def resolve_all_to_dos(root, info):
        return ToDo.objects.all()

    def resolve_to_do_by_id(root, info, id):
        return ToDo.objects.filter(id=id).first()


schema = Schema(query=Query)
