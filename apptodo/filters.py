from django_filters import rest_framework as filters

from apptodo.models import Project, ToDo


class ProjectViewFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ('name', )


class ToDoViewFilter(filters.FilterSet):
    project = filters.ModelChoiceFilter(queryset=Project.objects.all())
    created_d = filters.DateFromToRangeFilter()

    class Meta:
        model = ToDo
        fields = ('project', 'created_d')
