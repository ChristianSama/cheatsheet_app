import uuid
from django.db import models

class Cheatsheet(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) 
    title = models.CharField(max_length=500, null=True, blank=True, default="")
    description = models.CharField(max_length=500, null=True, blank=True, default="")
    score = models.IntegerField(null=True, blank=True, default=0)

    def __str__(self):
        return self.title

class Section(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) 
    title = models.CharField(max_length=500, null=True, blank=True, default="")
    description = models.CharField(max_length=500, null=True, blank=True, default="")
    cheatsheet = models.ForeignKey(Cheatsheet, on_delete=models.CASCADE, related_name='sections', null=True, blank=True)

    def __str__(self):
        return self.title

class Line(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) 
    description = models.CharField(max_length=500, null=True, blank=True)
    snippet = models.CharField(max_length=500, null=True, blank=True, default="")
    section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name='lines', null=True, blank=True, default="")

    def __str__(self):
        return self.description