from api.serializers import CheatsheetSerializer
from .models import Cheatsheet
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .permissions import IsOwnerOrReadOnly


class CheatsheetViewSet(viewsets.ModelViewSet):
    queryset = Cheatsheet.objects.all()
    serializer_class = CheatsheetSerializer
    http_method_names = ['get', 'post', 'retrieve', 'put', 'patch', 'delete']

    def get_permissions(self):
        permission_classes = []
        if self.action not in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
        return [permission() for permission in permission_classes]


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['userId'] = user.pk
        token['username'] = user.username
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
