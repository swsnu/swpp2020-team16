import json
from json import JSONDecodeError
from django.core.exceptions import ObjectDoesNotExist
from django.http import (
    HttpResponseBadRequest,
    HttpResponseNotAllowed,
    HttpResponse,
    JsonResponse,
)
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from analysis.models import SolutionReport
from problem.models import Solution, Problem, ProblemInput, ProblemOutput
from utils.utils import get_dicts_with_all, get_dicts_with_filter


@permission_classes((IsAuthenticated, ))
def problem_view(request):
    if request.method == "GET":
        return JsonResponse(
            get_dicts_with_all(Problem.objects),
            status=200,
            safe=False,
        )
    else:
        return HttpResponseNotAllowed(["GET"])


@permission_classes((IsAuthenticated, ))
def problem_by_id_view(request, problem_id=""):
    if request.method == "GET":
        try:
            return JsonResponse(
                Problem.objects.get(pk=problem_id).to_dict(),
                status=200,
                safe=False,
            )
        except ObjectDoesNotExist as error:
            return HttpResponseBadRequest(error)

    else:
        return HttpResponseNotAllowed(["GET"])


@permission_classes((IsAuthenticated, ))
def problem_by_objective_view(request, objective=""):
    if request.method == "GET":

        problems = get_dicts_with_filter(
            Problem.objects, objective=int(objective))
        return JsonResponse(problems, status=200, safe=False)
    else:
        return HttpResponseNotAllowed(["GET"])


@ permission_classes((IsAuthenticated, ))
def problem_input_view(request, problem_id=""):
    if request.method == "GET":
        problem_inputs = get_dicts_with_filter(
            ProblemInput.objects, problem__id=problem_id)
        if len(problem_inputs) == 0:
            return HttpResponseBadRequest()
        return JsonResponse(problem_inputs, status=200, safe=False)
    else:
        return HttpResponseNotAllowed(["GET"])


@ permission_classes((IsAuthenticated, ))
def problem_output_view(request, problem_input_id=""):
    if request.method == "GET":
        problem_outputs = get_dicts_with_filter(
            ProblemOutput.objects, problem_input__id=problem_input_id)
        if len(problem_outputs) == 0:
            return HttpResponseBadRequest()
        return JsonResponse(problem_outputs, status=200, safe=False)
    else:
        return HttpResponseNotAllowed(["GET"])


@ permission_classes((IsAuthenticated, ))
def solution_view(request, problem_id):
    if request.method == "GET":
        solutions = get_dicts_with_filter(
            Solution.objects, problem__id=problem_id, author_id=request.user.id)
        return JsonResponse(solutions, status=200, safe=False)
    elif request.method == "POST":
        try:
            problem = Problem.objects.get(pk=problem_id)
        except ObjectDoesNotExist:
            return HttpResponseBadRequest()
        try:
            body = request.body.decode()
            code = json.loads(body)["code"]
            erase_cnt = json.loads(body)["erase_cnt"]
            elapsed_time = json.loads(body)["elapsed_time"]
        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)

        solution = Solution(
            problem=problem, code=code, erase_cnt=erase_cnt, elapsed_time=elapsed_time, author_id=request.user.id)
        solution.save()

        SolutionReport(
            solution=solution, author=request.user, title=f"{problem.pid}_report", code=code
        ).save()

        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(["GET", "POST"])

@ permission_classes((IsAuthenticated, ))
def solution_for_others_view(request, problem_id="", user_id=""):
    if request.method == "GET":
        try:
            solution = Solution.objects.filter(
                problem__id=problem_id, author_id=user_id).last().to_dict()
        except ObjectDoesNotExist as error:
            return HttpResponseBadRequest(error)
        return JsonResponse(solution, status=200, safe=False)

    else :
        return HttpResponseNotAllowed(["POST","UPDATE", "DELETE"])
        