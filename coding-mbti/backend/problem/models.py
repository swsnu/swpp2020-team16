from django.db import models

# Create your models here.


class TextModel(models.Model):
    content = models.TextField()

    class Meta:
        abstract = True


class Problem(TextModel):
    class ProblemStyle(models.IntegerChoices):
        UM = 1
        NS = 2
        FT = 3
        PJ = 4
    problem_style = models.IntegerField(choices=ProblemStyle.choices)


class ProblemInput(TextModel):
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)


class ProblemOutput(TextModel):
    problem_input = models.OneToOneField(
        ProblemInput, on_delete=models.CASCADE)


class Solution(TextModel):
    class SolutionStatus(models.IntegerChoices):
        SUCCESS = 1
        WRONG = 2
        COMPILE_ERR = 3
        RUNTIME_ERR = 4
        TIME_LIMIT_EXCEED = 5
        OUT_OF_MEMORY = 6

    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    evalutaion = models.IntegerField(default=0)

    status = models.IntegerField(choices=SolutionStatus.choices)
