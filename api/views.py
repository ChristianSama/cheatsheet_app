from api.serializers import CheatsheetSerializer, MyTokenObtainPairSerializer, RegisterSerializer
from .models import Cheatsheet
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .permissions import IsOwnerOrReadOnly
from django.contrib.auth.models import User
from rest_framework import generics
from vote.views import VoteMixin


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class CheatsheetViewSet(viewsets.ModelViewSet, VoteMixin):
    queryset = Cheatsheet.objects.all()
    serializer_class = CheatsheetSerializer
    http_method_names = ['get', 'post', 'retrieve', 'put', 'patch', 'delete']

    # def get_permissions(self):
    #     permission_classes = []
    #     if self.action not in ['list', 'retrieve']:
    #         permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    #     return [permission() for permission in permission_classes]


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
