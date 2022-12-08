from django.urls import include, path
from rest_framework import routers
from api.views import CheatsheetViewSet

router = routers.DefaultRouter()
router.register('cheatsheets', CheatsheetViewSet)

urlpatterns = [
    path('', include(router.urls)),
]