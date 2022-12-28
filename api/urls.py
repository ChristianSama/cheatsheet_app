from django.urls import include, path
from rest_framework import routers
from api.views import CheatsheetViewSet, MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


router = routers.DefaultRouter()
router.register('cheatsheets', CheatsheetViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]