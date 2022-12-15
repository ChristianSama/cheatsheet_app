from rest_framework import serializers
from .models import Cheatsheet, Section, Line
import pdb

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
        sections = validated_data.pop("sections")
        cheatsheet_instance = Cheatsheet.objects.create(**validated_data)
        for section in sections:
            # need to pop lines field as well: https://stackoverflow.com/questions/74724918/django-nested-serializers-direct-assignment-to-the-reverse-side-of-a-related-s
            lines_data = section.pop("lines")
            section_instance = Section.objects.create(cheatsheet=cheatsheet_instance, **section)
            for line in lines_data:
                Line.objects.create(section=section_instance, **line)
        return cheatsheet_instance

    def update(self, instance, validated_data):
        sections = validated_data.pop("sections")
        instance.title = validated_data.get("title")
        instance.description = validated_data.get("description")
        instance.score = validated_data.get("score")
        instance.save()

        instance_sections = Section.objects.filter(cheatsheet=instance.pk).values_list("id", flat=True)
        
        section_ids_pool = []

        pdb.set_trace()

        for section in sections:
            if "id" in section.keys():
                if Section.objects.filter(id=section['id']).exists():
                    section_instance = Section.objects.get(id=section['id'])
                    section_instance.title = section.get('title', section_instance.title)
                    section_instance.description = section.get('description', section_instance.description)
                    section_instance.save()

                    #update lines
                    #TODO: check with section without lines
                    # for line in section['lines']:
                    #     if "id" in line.keys():
                    #         #update existing line
                    #     else:
                    #         #create new line
                    #         new_line = Line.objects.create(section=)


                    section_ids_pool.append(section_instance.id)
                else: #If received Section id doesn't exist
                    continue
            else:
                new_section = Section.objects.create(user=instance, **section)
                #update lines too?
                section_ids_pool.append(new_section.id)
        
        for section_id in instance_sections:
            if section_id not in section_ids_pool:
                Section.objects.filter(pk=section_id).delete()

        return instance
        