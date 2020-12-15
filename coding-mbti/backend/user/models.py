from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from group.models import Group
from problem.models import Problem, Solution
from utils.utils import to_dict, get_dicts_with_filter
from django.db.models import Count


class CodingStyleManager(models.Manager):
    def calculate_distribution(self):
        res = self.all().values('style').annotate(total=Count('style'))
        tot = res.count()
        UM = 0
        TI = 0
        EF = 0
        JC = 0
        for it in res:
            if it['style'] <= 8:
                UM += it['total']
            if ((it['style'] - 1) // 4) % 2 == 0:
                TI += it['total']
            if ((it['style'] - 1) // 8) % 2 == 0:
                EF += it['total']
            if (it['style'] - 1) % 2 == 0:
                JC += it['total']
        return UM / tot, TI / tot, EF / tot, JC / tot


class CodingStyle(models.Model):
    class Style(models.IntegerChoices):
        # User Friendly - Machine Efficiency
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

    objects = CodingStyleManager()

    def to_dict(self):
        return {
            "style": self.style,
            "UM_value": self.UM_value,
            "TI_value": self.TI_value,
            "EF_value": self.EF_value,
            "JC_value": self.JC_value
        }


class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, username, password, email, salt, role):
        user = self.model(username=username,
                          email=self.normalize_email(email),
                          salt=salt,
                          role=role)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password):
        if password is None:
            raise TypeError('Superusers must have a password.')
        user = self.create_user(username, password, '', '', 1)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    class Role(models.IntegerChoices):
        Coder = 1
        Manager = 2
        Researcher = 3

    username = models.CharField(max_length=21, unique=True, default=None)
    email = models.CharField(
        max_length=190, unique=True, null=True, default=None)
    nickname = models.CharField(max_length=21)
    password = models.TextField(null=True, default=None)
    salt = models.TextField(null=True, default=None)
    role = models.IntegerField(choices=Role.choices)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    profile_img = models.ImageField()

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELD = []

    readonly_fields = ('id',)

    class Meta:
        db_table = 'user'
        ordering = ['-pk']


class Coder(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    style = models.OneToOneField(
        CodingStyle, on_delete=models.SET_NULL, null=True, default=None)
    group = models.ForeignKey(
        Group, on_delete=models.SET_NULL, null=True, related_name='coder_group')

    def get_new_objective(self):
        solved_solutions = get_dicts_with_filter(
            Solution.objects, author_id=self.user.id)
        solved_styles = {1: 0, 2: 0, 3: 0}
        for solution in solved_solutions:
            problem = Problem.objects.get(pk=solution['problem_id'])
            solved_styles[problem.objective] += 1
        objective_ranks = sorted(solved_styles.items(), key=lambda x: x[1])
        return objective_ranks[0]

    def is_qualified(self):
        return self.get_new_objective()[1] > 0

    def to_dict(self):
        return {"user_id": self.user.pk,
                "username": self.user.username,
                "style": to_dict(self.style),
                "group": self.group.pk if self.group is not None else None
                }


class Researcher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)


class Manager(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def to_dict(self):
        return {
            "user": self.user.pk,
            "group": self.group.pk if self.group is not None else None
        }
