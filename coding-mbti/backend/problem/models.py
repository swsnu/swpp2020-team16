from django.db import models


class TextModel(models.Model):
    content = models.TextField()

    class Meta:  # pylint: disable=too-few-public-methods  
        abstract = True


class Problem(TextModel):
    class ProblemStyle(models.IntegerChoices):
        # User Frienly - Machine Efficiency
        # Time Complexity - Intutive Code
        # Easy style - Formatted Style
        # Just type - Carefully type
        UM = 1
        TI = 2
        EF = 3
        JC = 4
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
