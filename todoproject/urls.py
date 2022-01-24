from django.contrib import admin
from django.urls import path, include, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView

from appauth.jwtcustomizing import MyTokenObtainPairView
from appauth.views import CustomUserModelViewSet
from apptodo.views import ProjectModelViewSet, ToDoModelViewSet

schema_view = get_schema_view(
    openapi.Info(
        title='ToDoProject',
        default_version='0.1',
    ),
    public=True,
    permission_classes=(permissions.IsAuthenticatedOrReadOnly, ),
)

router = DefaultRouter()
router.register('users', CustomUserModelViewSet)
router.register('projects', ProjectModelViewSet)
router.register('todo', ToDoModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    re_path(r'^api/v(?P<version>\d\.\d)/', include(router.urls)),
    path('api/token-auth/', obtain_auth_token),
    path('api/jwt/', TokenObtainPairView.as_view()),
    path('api/jwt-refresh/', MyTokenObtainPairView.as_view()),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$',
            schema_view.without_ui(cache_timeout=0)),
    path('swagger/',
         schema_view.with_ui('swagger', cache_timeout=0)),
    path('redoc/',
         schema_view.with_ui('redoc', cache_timeout=0)),
]
