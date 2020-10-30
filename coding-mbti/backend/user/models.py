from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from group.models import Group

# Create your models here.
class CodingStyle(models.Model):
    class Style(models.IntegerChoices):
<<<<<<< HEAD
        # User Frienly - Machine Efficiency
        # Time Complexity - Intutive Code
        # Easy style - Formatted Style 
        # Just type - Carefully type
        UTEJ = 1
        UTEC = 2
        UTFJ = 3
        UTFC = 4
        UIEJ = 5
        UIEC = 6
        UIFJ = 7
        UIFC = 8
        MTEJ = 9
        MTEC = 10
        MTFJ = 11
        MTFC = 12
        MIEJ = 13
        EIEC = 14
        MIFJ = 15
        MIFC = 16
    style = models.IntegerField(choices=Style.choices)
    UM_value = models.FloatField()
    TI_value = models.FloatField()
    EF_value = models.FloatField()
    JC_value = models.FloatField()

=======
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
>>>>>>> 017d4a65474014b6d3199ea2a5cd410dbd3d6fc7

class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, username, password, email, salt, role):
<<<<<<< HEAD
=======
        if not email :            
            raise ValueError('must have user email')
>>>>>>> 017d4a65474014b6d3199ea2a5cd410dbd3d6fc7
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
<<<<<<< HEAD
    nickname = models.CharField(max_length=21, unique=True)
    password = models.TextField(null=True, default=None)
    salt = models.TextField(null=True, default=None)
    role = models.IntegerField(choices=Role.choices)
    profile_img = models.ImageField()
=======
    password = models.TextField(null=True, default=None)
    salt = models.TextField(null=True, default=None)
    role = models.IntegerField(choices=Role.choices)
>>>>>>> 017d4a65474014b6d3199ea2a5cd410dbd3d6fc7

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