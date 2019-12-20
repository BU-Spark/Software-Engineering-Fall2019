from django.urls import include, path
from rest_framework import routers
from server.users import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path(r'rest-auth/', include('rest_auth.urls')),
    url(r'users/', include('users.urls')),
    path(r'rest-auth/registration/', include('rest_auth.registration.urls')),
]