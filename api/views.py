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

    def list(self, request):
        if request.user.is_authenticated:
            user_tag_rank = {}
            cheatsheet_ids = [cs["id"] for cs in Cheatsheet.votes.all(request.user.id).values()]
            for id in cheatsheet_ids:
                tags = Cheatsheet.objects.get(id=id).tags.values()
                for tag in tags:
                    if tag['name'] in user_tag_rank:
                        user_tag_rank[tag['name']] += 1 
                    else:
                        user_tag_rank[tag['name']] = 1
            
            
            queryset = Cheatsheet.objects.all()
            serializer = CheatsheetSerializer(queryset, many=True)
            return Response(serializer.data)
        return super().list(request)

    def get_permissions(self):
        permission_classes = []
        if self.action not in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
        return [permission() for permission in permission_classes]


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
