from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from group.models import Group

# Create your models here.
class CodingStyle(models.Model):
    class Style(models.IntegerChoices):
        ISTJ = 1
        ISTP = 2
        ISFJ = 3
        ISFP = 4
        INTF = 5
        INTP = 6
        INFJ = 7
        INFP = 8
        ESTJ = 9
        ESTP = 10
        ESFJ = 11
        ESFP = 12
        ENTJ = 13
        ENTP = 14
        ENFJ = 15
        ENFP = 16
    style = models.IntegerField(choices=Style.choices)

class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, username, password, email, salt, role):
        if not email :            
            raise ValueError('must have user email')
        user = self.model(username=username,
            password=password,
            email=self.normalize_email(email),
            salt=salt,
            role=role)
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    class Role(models.IntegerChoices):
        Coder = 1
        Manager = 2
        Researcher = 3

    username = models.CharField(max_length=21, unique=True, default=None)
    email = models.CharField(max_length=190, unique=True, null=True, default=None)
    password = models.TextField(null=True, default=None)
    salt = models.TextField(null=True, default=None)
    role = models.IntegerField(choices=Role.choices)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELD = []

    class Meta:
        db_table = 'user'
        ordering = ['-pk']


class Coder(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    style = models.OneToOneField(CodingStyle, on_delete=models.SET_NULL, null=True)
    group = models.ForeignKey(Group, on_delete=models.SET_NULL, null=True, related_name='coder_group')

class Researcher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

class Manager(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    group = models.OneToOneField(Group, on_delete=models.SET_NULL, null=True, related_name='manager_group')
