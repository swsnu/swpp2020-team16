import os
import logging
import numpy as np


from django.core.management.base import BaseCommand
from django.conf import settings

from user.models import User, Coder, CodingStyle
from problem.models import Problem, ProblemInput, ProblemOutput, Solution
from analysis.models import SolutionReport, UserReport



def read_test_cases(option, pid):
    with open(f"{settings.PROB_DIR}/test_cases/{pid}/{option}.txt", "r") as f:
        test_cases = f.read().split("/")
    return test_cases


def list_problem_ids(_self):
    problem_ids = []
    for problem_id in os.listdir(f"{settings.PROB_DIR}/test_cases/"):
        problem_ids.append(problem_id)
    return problem_ids


def parse_problem(problem_filename):
    parsed = {}
    with open(problem_filename) as f:
        for line in f:
            elements = line.split("::")
            key = elements.pop(0)
            value = "::".join(elements)
            if key in ['objective', 'title', 'desc', 'input_desc', 'output_desc']:
                if key == 'objective':
                    value = int(value)
                parsed[key] = value
    return parsed


def parse_input(input_filename):
    with open(input_filename) as f:
        inputs = f.read().split("/")
    return inputs


def parse_output(output_filename):
    with open(output_filename) as f:
        outputs = f.read().split("/")
    return outputs


logger = logging.getLogger(__name__)
# python manage.py seed --mode=init

MODE_INIT = "init"
MODE_CLEAR = "clear"


class Command(BaseCommand):
    help = "seed database for testing and development."

    def add_arguments(self, parser):
        parser.add_argument("--mode", type=str, help="Mode")

    def handle(self, *args, **options):
        self.stdout.write("seeding data...")
        run_seed(self, options["mode"])
        self.stdout.write("done.")


def clear_data():
    logger.info("Delete Problem instances")
    Problem.objects.all().delete()
    ProblemInput.objects.all().delete()
    ProblemOutput.objects.all().delete()
    User.objects.all().delete()
    Coder.objects.all().delete()
    CodingStyle.objects.all().delete()
    Solution.objects.all().delete()
    SolutionReport.objects.all().delete()
    UserReport.objects.all().delete()


def create_problem_input_output_to_database(problem_id):
    problem_filename = f"{settings.PROB_DIR}/test_cases/{problem_id}/problem.txt"
    parsed_problem = parse_problem(problem_filename)
    input_filename = f"{settings.PROB_DIR}/test_cases/{problem_id}/input.txt"
    parsed_inputs = parse_input(input_filename)
    output_filename = f"{settings.PROB_DIR}/test_cases/{problem_id}/output.txt"
    parsed_outputs = parse_output(output_filename)

    problem = Problem(
        pid=problem_id,
        objective=parsed_problem["objective"],
        title=parsed_problem["title"],
        input_desc=parsed_problem["input_desc"],
        output_desc=parsed_problem["output_desc"],
        desc=parsed_problem["desc"],
    )
    problem.save()


    for i in range(len(parsed_inputs)):
        problem_input = ProblemInput(
            problem=problem,
            content=parsed_inputs[i]
        )
        problem_input.save()
        problem_output = ProblemOutput(
            problem_input=problem_input,
            content=parsed_outputs[i]
        )
        problem_output.save()


def sampling_without_replacement():
    return np.random.choice(range(300), size=80, replace=False, p=None)



def create_single_coder(num, style, problem1, problem2):
    user = User.objects.create_user(
            username=f"user{num}", password="12345678", email=f"user{num}@test.com", salt="123", role=1)

    coding_style = CodingStyle(style=style, UM_value=0, TI_value=0,EF_value=0,JC_value=0)
    coding_style.save()

    coder = Coder(user=user, style=coding_style)
    coder.save()

    solution1 = Solution(
            problem=problem1, code="test", erase_cnt=0, elapsed_time=0, author_id=user.id)
    solution1.save()

    SolutionReport(
            solution=solution1, author=user, title="ITP_1_6_B_report", code="test"
    ).save()

    solution2 = Solution(
            problem=problem2, code="test", erase_cnt=0, elapsed_time=0, author_id=user.id)
    solution2.save()

    SolutionReport(
            solution=solution2, author=user, title="ITP_2_3_B_report", code="test"
    ).save()

    user_report = UserReport(
                author=user, solution1=solution1.code, solution2=solution2.code,
                title=f"{user.username}'s report")
    user_report.to_dict()
    user_report.save()

def create_coder_by_style():
    problem1 = Problem.objects.all().first()
    problem2 = Problem.objects.all().last()
    style=0
    for idx, num in enumerate(sampling_without_replacement()):
        if idx % 5 == 0 :
            style +=1
        create_single_coder(num,style, problem1, problem2)

def create_data(_self):
    _self.stdout.write("seeding data...")

    for problem_id in list_problem_ids(_self):
        _self.stdout.write(problem_id)
        create_problem_input_output_to_database(problem_id)
    create_coder_by_style()
    _self.stdout.write("problems, inputs, outputs are created.")



def run_seed(_self, mode):
    clear_data()
    if mode == MODE_CLEAR:
        return
    create_data(_self)
