from django.db import models


class Group(models.Model):
    name = models.CharField(max_length=20, default='', unique=True)
    manager = models.ForeignKey(
        'user.Manager', on_delete=models.CASCADE, related_name='group_manager')
