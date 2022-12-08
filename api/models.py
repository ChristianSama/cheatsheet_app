from django.db import models

class Cheatsheet(models.Model):
    title = models.CharField(max_length=500)
    description = models.CharField(max_length=500)
    score = models.IntegerField()

    def __str__(self):
        return self.title

class Section(models.Model):
    title = models.CharField(max_length=500)
    description = models.CharField(max_length=500)
    cheatsheet = models.ForeignKey(Cheatsheet, on_delete=models.CASCADE, related_name='sections', null=True, blank=True)

    def __str__(self):
        return self.title

class Line(models.Model):
    description = models.CharField(max_length=500)
    snippet = models.CharField(max_length=500)
    section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name='lines', null=True, blank=True)

    def __str__(self):
        return self.description