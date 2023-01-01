from api.serializers import CheatsheetSerializer, MyTokenObtainPairSerializer, RegisterSerializer
from .models import Cheatsheet
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .permissions import IsOwnerOrReadOnly
from django.contrib.auth.models import User
from rest_framework import generics
from vote.views import VoteMixin
from rest_framework.response import Response


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class CheatsheetViewSet(viewsets.ModelViewSet, VoteMixin):
    queryset = Cheatsheet.objects.all()
    serializer_class = CheatsheetSerializer
    http_method_names = ['get', 'post', 'retrieve', 'put', 'patch', 'delete']

    # def list(self, request):
    #     if request.user.is_authenticated:
    #         print(Cheatsheet.votes.all(request.user.id))
    #         queryset = Cheatsheet.objects.all()
    #         serializer = CheatsheetSerializer(queryset, many=True)
    #         return Response(serializer.data)
    #     return super().list(request)


    def get_permissions(self):
        permission_classes = []
        if self.action not in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
        return [permission() for permission in permission_classes]


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
