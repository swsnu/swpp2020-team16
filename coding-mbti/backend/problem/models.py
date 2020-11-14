from django.db import models
from django.contrib.postgres.fields import ArrayField


def get_array_default():
    return list("default")


class Problem(models.Model):
    class ProblemObjective(models.IntegerChoices):
        # User Friendly - Machine Efficiency
        # Time Complexity - Intutive Code
        UM = 1
        TI = 2
    title = models.CharField(max_length=31, default="")
    desc = models.TextField(default="")
    objective = models.IntegerField(choices=ProblemObjective.choices)
    pid = models.CharField(max_length=31, default="")
    input_desc = models.TextField(default="")
    output_desc = models.TextField(default="")

    def to_dict(self):
        return {
            "title": self.title,
            "pid": self.pid,
            "desc": self.desc,
            "input_desc": self.input_desc,
            "output_desc": self.output_desc,
            "objective": self.objective,
            "id": self.id,
        }


class TestCase(models.Model):
    test_cases = ArrayField(models.TextField(), default=get_array_default)

    class Meta:
        abstract = True


class ProblemInput(TestCase):
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)

    def to_dict(self):
        return {"id": self.pk, "test_cases": self.test_cases}


class ProblemOutput(TestCase):
    problem_input = models.OneToOneField(
        ProblemInput, on_delete=models.CASCADE)

    def to_dict(self):
        return {"id": self.pk, "test_cases": self.test_cases}


class Solution(models.Model):
    class SolutionStatus(models.IntegerChoices):
        SUCCESS = 1
        RUNNING = 2
        WRONG = 3
        COMPILE_ERR = 4
        RUNTIME_ERR = 5
        TIME_LIMIT_EXCEED = 6
        OUT_OF_MEMORY = 7
    code = models.TextField()
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    evalutaion = models.IntegerField(default=0)
    erase_cnt = models.IntegerField(null=False, default=0)
    elapsed_time = models.IntegerField(null=False, default=0)

    status = models.IntegerField(
        choices=SolutionStatus.choices, default=SolutionStatus.RUNNING
    )
