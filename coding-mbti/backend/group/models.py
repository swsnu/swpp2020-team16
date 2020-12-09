from django.db import models
from django.core.exceptions import PermissionDenied


class Group(models.Model):
    name = models.CharField(max_length=20, default='', unique=True)
    manager = models.ForeignKey(
        'user.Manager', on_delete=models.CASCADE, related_name='group_manager')

    def to_dict(self):
        return {
            "id": self.pk,
            "name": self.name,
            "manager": self.manager.id,
        }

    def get_relations(self, coders):
        available_styles = {}
        for coder in coders:
            if coder.style:
                style = coder.style.style
                if style not in available_styles:
                    available_styles[style] = []
                available_styles[style].append(coder.id)
        return available_styles


class Invitation(models.Model):
    sender = models.ForeignKey(
        'user.Manager', on_delete=models.CASCADE, related_name='invitation_sender')
    receiver = models.ForeignKey(
        'user.Coder', on_delete=models.CASCADE, related_name='invitation_receiver')

    group = models.ForeignKey(
        Group, on_delete=models.CASCADE, related_name='invitation_group')

    is_accepted = models.BooleanField(default=False)

    def accept(self, user):
        if self.receiver.user != user:
            raise PermissionDenied()

        self.receiver.group = self.group
        self.receiver.save()

        self.is_accepted = True
        self.save()

    def to_dict(self):
        return {
            "id": self.pk,
            "sender": self.sender.id,
            "receiver": self.receiver.id,
            "group": self.group.id,
            "is_accepted": self.is_accepted,
        }
