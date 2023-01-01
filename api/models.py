import uuid
from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from taggit.managers import TaggableManager
from taggit.models import GenericUUIDTaggedItemBase, TaggedItemBase
from vote.models import VoteModel


class UUIDTaggedItem(GenericUUIDTaggedItemBase, TaggedItemBase):
    # If you only inherit GenericUUIDTaggedItemBase, you need to define
    # a tag field. e.g.
    # tag = models.ForeignKey(Tag, related_name="uuid_tagged_items", on_delete=models.CASCADE)

    class Meta:
        verbose_name = _("Tag")
        verbose_name_plural = _("Tags")


class Cheatsheet(VoteModel, models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=500, null=True, blank=True, default="")
    description = models.CharField(
        max_length=500, null=True, blank=True, default="")
    tags = TaggableManager(blank=True)

    def __str__(self):
        return self.title


class Section(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=500, null=True, blank=True, default="")
    description = models.CharField(
        max_length=500, null=True, blank=True, default="")
    cheatsheet = models.ForeignKey(
        Cheatsheet, on_delete=models.CASCADE, related_name='sections', null=True, blank=True)

    def __str__(self):
        return self.title


class Line(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    description = models.CharField(max_length=500, null=True, blank=True)
    snippet = models.CharField(
        max_length=500, null=True, blank=True, default="")
    section = models.ForeignKey(Section, on_delete=models.CASCADE,
                                related_name='lines', null=True, blank=True, default="")

    def __str__(self):
        return self.description
