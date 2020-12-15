import pickle
import joblib
import numpy as np

from django.db import models
from django.conf import settings
from django_extensions.db.models import TimeStampedModel
from user.models import User, CodingStyle
from problem.models import Problem
from group.models import Group
from utils.utils import to_dict


def get_inference(code, pid):
    vectorizer = pickle.load(
        open(f"{settings.ML_DIR}/problem{pid}/vectorizer.pickle", "rb")
    )

    clf_from_joblib = joblib.load(
        f"{settings.ML_DIR}/problem{pid}/model.pkl")

    prediction = int(clf_from_joblib.predict(
        vectorizer.transform([code]).toarray()))

    probability = float(
        np.max(clf_from_joblib.predict_proba(
            vectorizer.transform([code]).toarray()))
    )

    return prediction, probability


def get_jc_inference(erase_cnt, elapsed_time):
    if erase_cnt > 15 and elapsed_time > 100:
        prediction = 1
        probability = 1

    else:
        prediction = 0
        probability = 1

    return prediction, probability


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

    def predict_UM(self, code):
        return get_inference(code, "ITP1_6_B")

    def predict_RT(self, code):
        return get_inference(code, "ALDS1_4_B")

    def predict_TI(self, code):
        return get_inference(code, "ITP1_7_B")

    def predict_JC(self, erase_cnt, elapsed_time):
        return get_jc_inference(erase_cnt, elapsed_time)

    class Meta:
        abstract = True


class Distribution(models.Model):
    # User Frienly - Machine Efficiency
    # Time Complexity - Intutive Code
    # Easy style - Formatted Style
    # Just type - Carefully type
    UM = models.FloatField()
    TI = models.FloatField()
    RT = models.FloatField()
    JC = models.FloatField()

    def save(self):
        self.UM, self.TI, self.RT, self.JC = CodingStyle.objects.calculate_distribution()
        super(Distribution, self).save()

    def to_dict(self):
        return {
            "UM": self.UM,
            "TI": self.TI,
            "RT": self.RT,
            "JC": self.JC
        }


class DistributionReport(Report):
    distribution = models.ForeignKey(Distribution, on_delete=models.CASCADE)

    class Meta:
        abstract = True


class GlobalReport(DistributionReport):
    def save(self):
        self.status = Report.ReportStatus.READY
        self.distribution = Distribution()
        self.distribution.save()
        super(GlobalReport, self).save()

    def to_dict(self):
        return {
            "id": self.pk,
            "distribution": to_dict(self.distribution),
            "title": self.title,
            "author": self.author.pk,
            "content": self.content,
            "created_time": self.created,
        }


class GroupReport(DistributionReport):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)


class ProblemReport(DistributionReport):
    problem = models.ForeignKey("problem.Problem", on_delete=models.CASCADE)


class SolutionReport(Report):
    solution = models.ForeignKey("problem.Solution", on_delete=models.CASCADE)
    code = models.TextField(default="")
    elapsed_time = models.FloatField(default=11.0)
    erase_cnt = models.IntegerField(default=4)

    def is_available(self):
        return self.status == Report.ReportStatus.READY

    def to_dict(self):
        if not self.is_available():
            self.status = Report.ReportStatus.READY
            self.save()

        return {
            "author:": self.author.id,
            "elapsed_time": self.elapsed_time,
            "erase_cnt": self.erase_cnt,
            "title": self.title,
            "code": self.code,
            "status": self.solution.status,
            "objective-type": self.solution.problem.objective,
        }


class UserReport(Report):
    solution1 = models.TextField(default="")
    solution2 = models.TextField(default="")
    solution3 = models.TextField(default="")
    mean_elapsed_time = models.FloatField(default=0.0)
    mean_erase_cnt = models.IntegerField(default=0)
    style_int = models.IntegerField(default=0)
    style_str = models.CharField(default="", max_length=4)
    UM_prediction = models.IntegerField(
        choices=Problem.ProblemObjective.choices, default=0
    )
    UM_probability = models.FloatField(default=0)

    RT_prediction = models.IntegerField(
        choices=Problem.ProblemObjective.choices, default=0
    )
    RT_probability = models.FloatField(default=0)

    TI_prediction = models.IntegerField(
        choices=Problem.ProblemObjective.choices, default=0
    )
    TI_probability = models.FloatField(default=0)

    JC_prediction = models.IntegerField(
        choices=Problem.ProblemObjective.choices, default=0
    )
    JC_probability = models.FloatField(default=0)

    def is_available(self):
        return self.status == Report.ReportStatus.READY

    def to_dict(self):
        if not self.is_available():
            self.UM_prediction, self.UM_probability = self.predict_UM(
                self.solution1)

            self.RT_prediction, self.RT_probability = self.predict_RT(
                self.solution2)

            self.TI_prediction, self.TI_probability = self.predict_TI(
                self.solution3)

            self.JC_prediction, self.JC_probability = self.predict_JC(
                self.mean_elapsed_time, self.mean_erase_cnt)

            predictions = (self.UM_prediction, self.TI_prediction,
                           self.RT_prediction, self.JC_prediction)
            if predictions == (1, 1, 1, 1):
                self.style_int = 1
                self.style_str = 'UTRJ'
            elif predictions == (1, 1, 1, 0):
                self.style_int = 2
                self.style_str = 'UTRC'
            elif predictions == (1, 1, 0, 1):
                self.style_int = 3
                self.style_str = 'UTTJ'
            elif predictions == (1, 1, 0, 0):
                self.style_int = 4
                self.style_str = 'UTTC'
            elif predictions == (1, 0, 1, 1):
                self.style_int = 5
                self.style_str = 'UIRJ'
            elif predictions == (1, 0, 1, 0):
                self.style_int = 6
                self.style_str = 'UIRC'
            elif predictions == (1, 0, 0, 1):
                self.style_int = 7
                self.style_str = 'UITJ'
            elif predictions == (1, 0, 0, 0):
                self.style_int = 8
                self.style_str = 'UITC'
            elif predictions == (0, 1, 1, 1):
                self.style_int = 9
                self.style_str = 'MTRJ'
            elif predictions == (0, 1, 1, 0):
                self.style_int = 10
                self.style_str = 'MTRC'
            elif predictions == (0, 1, 0, 1):
                self.style_int = 11
                self.style_str = 'MTTJ'
            elif predictions == (0, 1, 0, 0):
                self.style_int = 12
                self.style_str = 'MTTC'
            elif predictions == (0, 0, 1, 1):
                self.style_int = 13
                self.style_str = 'MIRJ'
            elif predictions == (0, 0, 1, 0):
                self.style_int = 14
                self.style_str = 'MTRC'
            elif predictions == (0, 0, 0, 1):
                self.style_int = 15
                self.style_str = 'MITJ'
            elif predictions == (0, 0, 0, 0):
                self.style_int = 16
                self.style_str = 'MITC'

            self.status = Report.ReportStatus.READY
            self.save()

        return {
            "id": self.pk,
            "title": self.title,
            "author:": self.author.id,
            "UM_prediction": self.UM_prediction,
            "UM_probability": self.UM_probability,
            "RT_prediction": self.RT_prediction,
            "RT_probability": self.RT_probability,
            "TI_prediction": self.TI_prediction,
            "TI_probability": self.TI_probability,
            "JC_prediction": self.JC_prediction,
            "JC_probability": self.JC_probability,
            "style_str": self.style_str,
            "style_int": self.style_int
        }
