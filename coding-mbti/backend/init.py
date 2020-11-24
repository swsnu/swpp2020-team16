import os
from django.conf import settings
from problem.models import Problem, ProblemInput, ProblemOutput

def list_problem_ids():
    problem_ids = []
    for problem_id in filter(os.path.isdir, os.listdir(f"{settings.PROB_DIR}/test_cases")):
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


def create_data():
    for problem_id in list_problem_ids():
        create_problem_input_output_to_database(problem_id)


if __name__ == "__main__":
    create_data()
