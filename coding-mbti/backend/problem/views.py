import json
from json import JSONDecodeError

from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.csrf import csrf_exempt
from django.http import (
    HttpResponseBadRequest,
    HttpResponseNotAllowed,
    HttpResponse,
    JsonResponse,
)
from analysis.models import SolutionReport
from problem.models import Solution, Problem, ProblemInput, ProblemOutput


def problem_view(request):
    if request.method == "GET":
        return JsonResponse(
            list(map(lambda problem: problem.to_dict(), Problem.objects.all())),
            status=200,
            safe=False,
        )
    else:
        return HttpResponseNotAllowed(["POST", "UPDATE", "DELETE"])


def problem_by_style_id_view(request, style_id=""):
    if request.method == "GET":
        problem = Problem.objects.filter(style=style_id).first().to_dict()
        return JsonResponse(problem, status=200, safe=False)
    else:
        return HttpResponseNotAllowed(["POST", "UPDATE", "DELETE"])


def problem_input_view(request, problem_id=""):
    if request.method == "GET":
        problem_input = (
            ProblemInput.objects.filter(
                problem__id=problem_id).first().to_dict()
        )
        return JsonResponse([problem_input], status=200, safe=False)
    else:
        return HttpResponseNotAllowed(["POST", "UPDATE", "DELETE"])


def problem_output_view(request, problem_input_id=""):
    if request.method == "GET":
        problem_output = (
            ProblemOutput.objects.filter(problem_input__id=problem_input_id)
            .first()
            .to_dict()
        )
        return JsonResponse([problem_output], status=200, safe=False)
    else:
        return HttpResponseNotAllowed(["POST", "UPDATE", "DELETE"])


@csrf_exempt
def solution_view(request, problem_id):
    if request.method == "POST":
        try:
            problem = Problem.objects.get(pk=problem_id)
        except ObjectDoesNotExist:
            return HttpResponseBadRequest()

        try:
            body = request.body.decode()
            content = json.loads(body)["content"]
            erase_cnt = json.loads(body)["erase_cnt"]
        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)

        solution = Solution(
            problem=problem, content=content, erase_cnt=erase_cnt)
        solution.save()

        SolutionReport(
            solution=solution, author=request.user, title=f"{problem.name}_report"
        ).save()

        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(["GET", "UPDATE", "DELETE"])
