from rest_framework import serializers
from .models import Cheatsheet, Section, Line

class LineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Line
        fields = "__all__"

class SectionSerializer(serializers.ModelSerializer):
    lines = LineSerializer(many=True)

    class Meta:
        model = Section
        fields = "__all__"

class CheatsheetSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True)

    class Meta:
        model = Cheatsheet
        fields = "__all__"

    def create(self, validated_data):
        sections_data = validated_data.pop('sections')
        cheatsheet = Cheatsheet.objects.create(**validated_data)
        for section in sections_data:
            # need to pop lines field as well: https://stackoverflow.com/questions/74724918/django-nested-serializers-direct-assignment-to-the-reverse-side-of-a-related-s
            lines_data = section.pop('lines')
            section_data = Section.objects.create(cheatsheet=cheatsheet, **section)
            for line in lines_data:
                Line.objects.create(section=section_data, **line)
        return cheatsheet