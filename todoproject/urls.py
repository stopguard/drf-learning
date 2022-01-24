from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView

from appauth.jwtcustomizing import MyTokenObtainPairView
from appauth.views import CustomUserModelViewSet
from apptodo.views import ProjectModelViewSet, ToDoModelViewSet

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
]
