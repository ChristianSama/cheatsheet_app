from api.serializers import CheatsheetSerializer
from .models import Cheatsheet
from rest_framework import viewsets

class CheatsheetViewSet(viewsets.ModelViewSet):
    queryset = Cheatsheet.objects.all()
    serializer_class = CheatsheetSerializer