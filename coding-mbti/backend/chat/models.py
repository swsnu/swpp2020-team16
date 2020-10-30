from django.db import models
from django_extensions.db.models import TimeStampedModel
from user.models import User
from group.models import Group


class Chat(TimeStampedModel):
    sender = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='chat_sender')
    receiver = models.ManyToManyField(User, related_name='chat_receiver')

    content = models.TextField()


class Invitation(Chat):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
