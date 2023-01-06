from django.db import models
from django.contrib.auth.models import User
from taggit.managers import TaggableManager
from vote.models import VoteModel


class Cheatsheet(VoteModel, models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=500, null=True, blank=True, default="")
    description = models.CharField(
        max_length=500, null=True, blank=True, default="")
    tags = TaggableManager(blank=True)

    def __str__(self):
        return self.title


class Section(models.Model):
    title = models.CharField(max_length=500, null=True, blank=True, default="")
    description = models.CharField(
        max_length=500, null=True, blank=True, default="")
    cheatsheet = models.ForeignKey(
        Cheatsheet, on_delete=models.CASCADE, related_name='sections', null=True, blank=True)

    def __str__(self):
        return self.title


class Line(models.Model):
    description = models.CharField(max_length=500, null=True, blank=True)
    snippet = models.CharField(
        max_length=500, null=True, blank=True, default="")
    section = models.ForeignKey(Section, on_delete=models.CASCADE,
                                related_name='lines', null=True, blank=True, default="")

    def __str__(self):
        return self.description
