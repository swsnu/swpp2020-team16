from django.db import models
from user.models import Researcher
from django_extensions.db.models import TimeStampedModel

# Create your models here.
class Report(TimeStampedModel):
    author = models.ForeignKey(Researcher, on_delete=models.CASCADE)
    title = models.TextField()
    content = models.TextField()

