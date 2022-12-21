from django.db import models

class Cheatsheet(models.Model):
    title = models.CharField(max_length=500, null=True, blank=True)
    description = models.CharField(max_length=500, null=True, blank=True)
    score = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.title

class Section(models.Model):
    title = models.CharField(max_length=500, null=True, blank=True)
    description = models.CharField(max_length=500, null=True, blank=True)
    cheatsheet = models.ForeignKey(Cheatsheet, on_delete=models.CASCADE, related_name='sections', null=True, blank=True)

    def __str__(self):
        return self.title

class Line(models.Model):
    description = models.CharField(max_length=500, null=True, blank=True)
    snippet = models.CharField(max_length=500, null=True, blank=True)
    section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name='lines', null=True, blank=True)

    def __str__(self):
        return self.description