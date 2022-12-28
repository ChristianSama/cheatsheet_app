from api.serializers import CheatsheetSerializer
from .models import Cheatsheet
from rest_framework import viewsets
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class CheatsheetViewSet(viewsets.ModelViewSet):
    queryset = Cheatsheet.objects.all()
    serializer_class = CheatsheetSerializer
    http_method_names = ['get','post','retrieve','put','patch', 'delete']

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
