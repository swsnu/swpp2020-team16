import os
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


class Command(BaseCommand):
    help = "seed database for testing and development."

    def add_arguments(self, parser):
        parser.add_argument("--mode", type=str, help="Mode")

    def handle(self, *args, **options):
        self.stdout.write("seeding data...")
        run_seed(self, options["mode"])
        self.stdout.write("done.")


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

    assert(len(parsed_inputs) == len(parsed_outputs))

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


def create_single_coder(num, style, problems):
    user = User(
        username=f"user{num}", password="pbkdf2_sha256$216000$dLAEQvY7dMNY$xwzmhoRJjxK91PNu3KnPE5b5MGPEAtSzDafu5qfJAJo=", email=f"user{num}@test.com", salt="123", role=1)
    user.save()

    coding_style = CodingStyle(
        style=style, UM_value=0.5, TI_value=0.5, RT_value=0.5, JC_value=0.5)
    coding_style.save()

    coder = Coder(user=user, style=coding_style)
    coder.save()

    solutions = []
    for problem in problems:
        solution = Solution(
            problem=problem, code="def hi() : \n print('hi')", erase_cnt=20, elapsed_time=18, author_id=user.id)
        solution.save()

        SolutionReport(
            solution=solution, author=user, title=f"{problem.pid}_report", code="def hi() : \n print('hi')"
        ).save()

        solutions.append(solution)

    user_report = UserReport(
        author=user, solution1=solutions[0].code, solution2=solutions[1].code, solution3=solutions[2].code,
        title=f"{user.username}'s report")
    user_report.to_dict()
    user_report.save()


def seed_group_with_manager(_self):
    user1 = User.objects.create_user(
        username="manager_user1", password="123", email="test@test.com", salt="123", role=User.Role.Manager
    )
    user1.save()
    manager1 = Manager(user=user1)
    manager1.save()

    user2 = User.objects.create_user(
        username="manager_user2", password="123", email="test2@test.com", salt="123", role=User.Role.Manager
    )
    user2.save()
    manager2 = Manager(user=user2)
    manager2.save()

    group = Group(name="group_1", manager=manager1)
    group.save()


def seed_coder_by_style(_self):
    problems = list(map(lambda x: Problem.objects.get(
        pid=x), list_problem_ids(_self)))

    numStyles = 16
    numUsersByStyle = 5
    numUsers = numUsersByStyle * numStyles

    _self.stdout.write(
        f"{numUsersByStyle} coders for each of {numStyles} styles will be created!")
    _self.stdout.write(f"total {numUsersByStyle * numStyles} coders!")

    for idx, userId in enumerate(range(numUsers)):
        create_single_coder(userId, idx % numStyles + 1, problems)
        if idx % 10 == 0:
            _self.stdout.write(f"[ {idx} / {numUsers} ] completed...")


def seed_problem_input_output_all_at_once(_self):
    for problem_id in list_problem_ids(_self):
        _self.stdout.write(problem_id)
        create_problem_input_output_to_database(problem_id)


def run_seed(_self, mode):
    _self.stdout.write("seeding data...")

    seed_problem_input_output_all_at_once(_self)
    _self.stdout.write(
        "[Done] problems, inputs, outputs are created all at once.")

    seed_coder_by_style(_self)
    _self.stdout.write(
        "[Done] 5 coders by each 16 style are created.")
