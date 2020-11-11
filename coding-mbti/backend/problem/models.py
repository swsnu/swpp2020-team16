from django.db import models




class TextModel(models.Model):
    content = models.TextField()

    class Meta:
        abstract = True


class Problem(TextModel):
    class ProblemObjective(models.IntegerChoices):
        # User Frienly - Machine Efficiency
        # Time Complexity - Intutive Code
        UM = 1
        TI = 2

    objective = models.IntegerField(choices=ProblemObjective.choices)
    name = models.CharField(max_length=31, default="")

    def to_dict(self):
        return {
            "title": self.name,
            "name": self.name,
            "content": self.content,
            "objective": self.objective,
            "id": self.id,

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
