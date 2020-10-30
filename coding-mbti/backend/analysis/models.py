from django.db import models
from user.models import Researcher
from group.models import Group
from problem.models import Problem, Solution
from django_extensions.db.models import TimeStampedModel


class Report(TimeStampedModel):
    author = models.ForeignKey(Researcher, on_delete=models.CASCADE)
    title = models.TextField()
    content = models.TextField()

    class Meta:
        abstract = True


class Distribution(models.Model):
    UM = models.FloatField()
    TI = models.FloatField()
    EF = models.FloatField()
    JC = models.FloatField()


class DistributionReport(Report):
    distribution = models.ForeignKey(Distribution, on_delete=models.CASCADE)

    class Meta:
        abstract = True


class GlobalReport(DistributionReport):
    pass


class GroupReport(DistributionReport):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)


class ProblemReport(DistributionReport):
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)


class SolutionReport(Report):
    solution = models.ForeignKey(Solution, on_delete=models.CASCADE)
