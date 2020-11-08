from django.db import models
from django_extensions.db.models import TimeStampedModel
from user.models import Researcher
from group.models import Group
from problem.models import Problem, Solution


class Report(TimeStampedModel):
    author = models.ForeignKey(Researcher, on_delete=models.CASCADE)
    title = models.TextField()
    content = models.TextField()

    class Meta:  # pylint: disable=too-few-public-methods  
        abstract = True


class Distribution(models.Model):
    # User Frienly - Machine Efficiency
    # Time Complexity - Intutive Code
    # Easy style - Formatted Style
    # Just type - Carefully type
    UM = models.FloatField()
    TI = models.FloatField()
    EF = models.FloatField()
    JC = models.FloatField()


class DistributionReport(Report):
    distribution = models.ForeignKey(Distribution, on_delete=models.CASCADE)

    class Meta:  # pylint: disable=too-few-public-methods  
        abstract = True


class GlobalReport(DistributionReport):
    pass


class GroupReport(DistributionReport):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)


class ProblemReport(DistributionReport):
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)


class SolutionReport(Report):
    solution = models.ForeignKey(Solution, on_delete=models.CASCADE)
