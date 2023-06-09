from django.db import models
from django.utils.text import Truncator
from django.utils.timezone import now
import os
import rengorum.settings

# TODO - reconsider fields, probably don't need size, can get filename from the actual file, and should define a knowledgebase type to refer to (dicsord bot, wiki page etc etc)
class KnowledgeBase(models.Model):
    """ Model to represent a thread in a forum """
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255) # TODO define types - discord, html, pdf. etc
    size = models.FloatField()
    file = models.FileField(upload_to=os.path.join(rengorum.settings.MEDIA_ROOT, "knowledgebase/"), default=os.path.join(rengorum.settings.MEDIA_ROOT,'knowledgebase/default.txt'))
    created_at = models.DateTimeField(auto_now_add=True)
    last_activity = models.DateTimeField(default=now)

    class Meta:
        ordering = [
            '-name'
        ]

    def __str__(self):
        truncated_name = Truncator(self.name)
        return truncated_name.chars(30)
