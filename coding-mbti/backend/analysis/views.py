from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.core.exceptions import ObjectDoesNotExist

from user.models import Coder
from problem.models import Solution
from analysis.models import SolutionReport, UserReport


@permission_classes((IsAuthenticated, ))
def my_report_view(request):

    if request.method == 'POST':
        try:
            solution1 = SolutionReport.objects.filter(
                title="ITP1_6_B_report", author__id=request.user.id).last()
            solution2 = SolutionReport.objects.filter(
                title="ALDS1_4_B_report", author__id=request.user.id).last()
            solution3 = SolutionReport.objects.filter(
                title="ITP1_7_B_report", author__id=request.user.id).last()
            code1 = solution1.code
            code2 = solution2.code
            code3 = solution3.code
            mean_elapsed_time = (
                solution1.elapsed_time + solution2.elapsed_time + solution3.elapsed_time)/3
            mean_erase_cnt = (solution1.erase_cnt +
                              solution2.erase_cnt + solution3.erase_cnt)/3

        except (ObjectDoesNotExist, AttributeError) as error:
            return HttpResponseBadRequest(error)
        try:
            user_report = UserReport(
                author=request.user, solution1=code1, solution2=code2, solution3=code3, mean_elapsed_time=mean_elapsed_time, mean_erase_cnt=mean_erase_cnt,
                title=f"user{request.user.id}'s report")
            user_report.save()
        except (ObjectDoesNotExist, AttributeError) as error:
            return HttpResponseBadRequest(error)
        return HttpResponse(status=204)

    elif request.method == 'GET':
        try:
            user_report = UserReport.objects.filter(
                author=request.user).last().to_dict()

        except (ObjectDoesNotExist, AttributeError) as error:
            return HttpResponseBadRequest(error)
        return JsonResponse(user_report, status=200, safe=False)
    else:
        return HttpResponseNotAllowed(['UPDATE', 'DELETE'])


@permission_classes((IsAuthenticated, ))
def other_report_view(request, user_id=""):
    if request.method == "GET":
        try:
            user_report = UserReport.objects.filter(
                author__id=user_id).last().to_dict()
        except (ObjectDoesNotExist, AttributeError) as error:
            return HttpResponseBadRequest(error)
        return JsonResponse(user_report, status=200, safe=False)

    else:
        return HttpResponseNotAllowed(["POST", "UPDATE", "DELETE"])


@permission_classes((IsAuthenticated, ))
def my_solutions_view(request):
    if request.method == "GET":
        try:
            solution1 = Solution.objects.filter(
                problem__pid="ITP1_6_B", author_id=request.user.id).last().to_dict()
            solution2 = Solution.objects.filter(
                problem__pid="ALDS1_4_B", author_id=request.user.id).last().to_dict()
            solution3 = Solution.objects.filter(
                problem__pid="ITP1_7_B", author_id=request.user.id).last().to_dict()
            response_arr = [solution1, solution2, solution3]

        except (ObjectDoesNotExist, AttributeError) as error:
            return HttpResponseBadRequest(error)
        return JsonResponse(response_arr, status=200, safe=False)

    else:
        return HttpResponseNotAllowed(["GET"])


@permission_classes((IsAuthenticated, ))
def other_solutions_view(request, user_id=""):
    if request.method == "GET":
        try:
            solution1 = Solution.objects.filter(
                problem__pid="ITP1_6_B", author_id=user_id).last().to_dict()
            solution2 = Solution.objects.filter(
                problem__pid="ALDS1_4_B", author_id=user_id).last().to_dict()
            solution3 = Solution.objects.filter(
                problem__pid="ITP1_7_B", author_id=user_id).last().to_dict()
            response_arr = [solution1, solution2, solution3]

        except (ObjectDoesNotExist, AttributeError) as error:
            return HttpResponseBadRequest(error)
        return JsonResponse(response_arr, status=200, safe=False)

    else:
        return HttpResponseNotAllowed(["GET"])


@permission_classes((IsAuthenticated, ))
def get_coders_by_style(request, style=""):
    if request.method == 'GET':
        try:

            return JsonResponse(
                list(map(lambda coder: coder.to_dict(),
                         Coder.objects.filter(style__style=int(style)))),
                status=200,
                safe=False,)
        except ObjectDoesNotExist as error:
            return HttpResponseBadRequest(error)
    else:
        return HttpResponseNotAllowed(['GET'])
