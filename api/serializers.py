from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from drf_writable_nested.serializers import WritableNestedModelSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from taggit.serializers import (TagListSerializerField,
                                TaggitSerializer)


from api.models import Cheatsheet, Line, Section

class UserSerializer(serializers.Serializer):
    username = serializers.CharField()
    id = serializers.IntegerField()

    class Meta: 
        model = User
        fields = ['id', 'username']


class LineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Line
        fields = "__all__"


class SectionSerializer(WritableNestedModelSerializer):
    lines = LineSerializer(many=True, required=False)

    class Meta:
        model = Section
        fields = "__all__"

class CheatsheetCreateSerializer(TaggitSerializer, WritableNestedModelSerializer):
    sections = SectionSerializer(many=True, required=False)
    tags = TagListSerializerField(required=False)

    class Meta:
        model = Cheatsheet
        fields = ("id", "sections", "tags", "vote_score", "title", "description", "user")

class CheatsheetReadSerializer(TaggitSerializer, WritableNestedModelSerializer):
    sections = SectionSerializer(many=True, required=False)
    tags = TagListSerializerField(required=False)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Cheatsheet
        fields = ("id", "sections", "tags", "vote_score", "title", "description", "user")


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user
