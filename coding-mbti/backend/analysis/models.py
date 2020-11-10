from django.db import models
from django_extensions.db.models import TimeStampedModel
from user.models import User
from problem.models import Problem
from group.models import Group


class Report(TimeStampedModel):
    class ReportStatus(models.IntegerChoices):
        READY = 1
        RUNNING = 2
        ERROR = 3

    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.TextField()
    content = models.TextField()
    status = models.IntegerField(
        choices=ReportStatus.choices, default=ReportStatus.RUNNING
    )

    class Meta:
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

    class Meta:
        abstract = True


class GlobalReport(DistributionReport):
    pass


class GroupReport(DistributionReport):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)


class ProblemReport(DistributionReport):
    problem = models.ForeignKey("problem.Problem", on_delete=models.CASCADE)


class SolutionReport(Report):
    solution = models.ForeignKey("problem.Solution", on_delete=models.CASCADE)

    def is_available(self):
        return self.status == Report.ReportStatus.READY

    def to_dict(self):
        if not self.is_available():
            self.status = Report.ReportStatus.READY
            self.save()

        return {
            "author:": self.author.id,
            "title": self.title,
            "content": self.content,
            "status": self.solution.status,
            "style-type": self.solution.problem.style,
        }


class UserReport(Report):
    solution1 = models.TextField()
    solution2 = models.TextField()

    ml_prediction = models.IntegerField(
        choices=Problem.ProblemStyle.choices, null=True)
    ml_probability = models.FloatField(default=0)

    style_prediction = models.IntegerField(
        choices=Problem.ProblemStyle.choices, null=True
    )
    style_probability = models.FloatField(default=0)

    erase_prediction = models.IntegerField(
        choices=Problem.ProblemStyle.choices, null=True
    )
    erase_probability = models.FloatField(default=0)

    def is_available(self):
        return self.status == Report.ReportStatus.READY

    def to_dict(self):
        if not self.is_available():

            (
                self.style_prediction,
                self.style_probability,
            ) = self.solution.problem.predict_style(self.solution1)

            self.ml_prediction, self.ml_probability = self.solution.problem.predict_ml(
                self.solution2
            )

            self.status = Report.ReportStatus.READY
            self.save()

        return {
            "id": self.pk,
            "title": self.title,
            "author:": self.author.id,
            "status": self.solution.status,
            "ml_prediction": self.ml_prediction,
            "ml_probability": self.ml_probability,
            "style_prediction": self.style_prediction,
            "style_probability": self.style_probability,
        }
