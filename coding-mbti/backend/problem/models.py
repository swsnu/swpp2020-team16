from django.db import models


def get_array_default():
    return list("default")


class Problem(models.Model):
    class ProblemObjective(models.IntegerChoices):
        # User Friendly - Machine Efficiency
        # Time Complexity - Intutive Code
        UM = 1
        TI = 2
        RT = 3
        JC = 4
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
    content = models.TextField(default="")

    class Meta:
        abstract = True


class ProblemInput(TestCase):
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)

    def to_dict(self):
        return {"id": self.pk, "content": self.content}


class ProblemOutput(TestCase):
    problem_input = models.OneToOneField(
        ProblemInput, on_delete=models.CASCADE)

    def to_dict(self):
        return {"id": self.pk, "content": self.content}


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
    author_id = models.IntegerField(default=0)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    evalutaion = models.IntegerField(default=0)
    erase_cnt = models.IntegerField(null=False, default=0)
    elapsed_time = models.IntegerField(null=False, default=0)
    status = models.IntegerField(
        choices=SolutionStatus.choices, default=SolutionStatus.RUNNING
    )

    def to_dict(self):
        return {"id": self.pk, "evaluation": self.evalutaion, "problem_id": self.problem.pk,
                "code": self.code, "erase_cnt": self.erase_cnt, "elapsed_time": self.elapsed_time,
                "status": self.status,
                }
