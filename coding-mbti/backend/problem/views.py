import json
from json import JSONDecodeError
from django.core.exceptions import ObjectDoesNotExist
from django.http import (
    HttpResponseBadRequest,
    HttpResponseNotAllowed,
    JsonResponse,
)
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from analysis.models import SolutionReport
from problem.models import Solution, Problem, ProblemInput, ProblemOutput
from user.models import Coder
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
def problem_by_objective_view(request):
    if request.method == "GET":
        coder = Coder.objects.get(user=request.user)
        return JsonResponse(Problem.objects.with_specific_user(coder), status=200, safe=False)
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
def problem_output_view(request, problem_id=""):
    if request.method == "GET":
        problem_inputs = ProblemInput.objects.filter(problem__id=problem_id)
        problem_outputs = list(map(
            lambda input: get_dicts_with_filter(
                ProblemOutput.objects, problem_input__id=input.id)[0],
            problem_inputs))
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
            req_data = json.loads(request.body.decode())
            code = req_data["code"]
            erase_cnt = int(req_data["erase_cnt"])
            elapsed_time = int(req_data["elapsed_time"])
            evaluation = int(req_data["evaluation"])

        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)

        solution = Solution(
            problem=problem, code=code, erase_cnt=erase_cnt,
            elapsed_time=elapsed_time, author_id=request.user.id,
            evalutaion=evaluation)
        solution.save()

        SolutionReport(
            solution=solution, author=request.user, title=f"{problem.pid}_report", code=code, erase_cnt=erase_cnt, elapsed_time=elapsed_time
        ).save()

        return JsonResponse({"id": solution.pk}, status=201)
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

    else:
        return HttpResponseNotAllowed(["POST", "UPDATE", "DELETE"])
