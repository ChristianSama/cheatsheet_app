from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer

from api.models import Cheatsheet, Line, Section

class LineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Line
        fields = "__all__"

class SectionSerializer(WritableNestedModelSerializer):
    lines = LineSerializer(many=True, required=False)

    class Meta:
        model = Section
        fields = "__all__"

class CheatsheetSerializer(WritableNestedModelSerializer):
    sections = SectionSerializer(many=True, required=False)

    class Meta:
        model = Cheatsheet
        fields = "__all__"