import pickle
import joblib
import numpy as np

from django.db import models
from django.conf import settings


def get_inference(code, pid, model_name):
    vectorizer = pickle.load(
        open(f"{settings.ML_DIR}/problem{pid}/vectorizer.pkl", "rb")
    )

    clf_from_joblib = joblib.load(
        f"{settings.ML_DIR}/problem{pid}/{model_name}.pkl")

    prediction = int(clf_from_joblib.predict(
        vectorizer.transform([code]).toarray()))

    probability = float(
        np.max(clf_from_joblib.predict_proba(
            vectorizer.transform([code]).toarray()))
    )

    return prediction, probability


def get_erase_inference(erase_cnt, pid):
    clf_from_joblib = joblib.load(
        f"{settings.ML_DIR}/problem{pid}/model_erase.pkl")

    prediction = int(clf_from_joblib.predict(erase_cnt))
    probability = float(np.max(clf_from_joblib.predict_proba(erase_cnt)))

    return prediction, probability


class TextModel(models.Model):
    content = models.TextField()

    class Meta:
        abstract = True


class Problem(TextModel):
    class ProblemStyle(models.IntegerChoices):
        # User Frienly - Machine Efficiency
        # Time Complexity - Intutive Code
        UM = 1
        TI = 2

    style = models.IntegerField(choices=ProblemStyle.choices)
    name = models.CharField(max_length=31, default="")

    def predict_ml(self, code):
        return get_inference(code, self.name, "model")

    def predict_style(self, code):
        return get_inference(code, self.name, "model_style")

    def predict_erase(self, erase_cnt):
        return get_erase_inference(erase_cnt, self.name)

    def to_dict(self):
        return {
            "title": self.name,
            "name": self.name,
            "content": self.content,
            "style": self.style,
            "id": self.pk,
        }


class ProblemInput(TextModel):
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)

    def to_dict(self):
        return {"id": self.pk, "content": self.content}


class ProblemOutput(TextModel):
    problem_input = models.OneToOneField(
        ProblemInput, on_delete=models.CASCADE)

    def to_dict(self):
        return {"id": self.pk, "content": self.content}


class Solution(TextModel):
    class SolutionStatus(models.IntegerChoices):
        SUCCESS = 1
        RUNNING = 2
        WRONG = 3
        COMPILE_ERR = 4
        RUNTIME_ERR = 5
        TIME_LIMIT_EXCEED = 6
        OUT_OF_MEMORY = 7

    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    evalutaion = models.IntegerField(default=0)
    erase_cnt = models.IntegerField(null=False, default=0)

    status = models.IntegerField(
        choices=SolutionStatus.choices, default=SolutionStatus.RUNNING
    )
