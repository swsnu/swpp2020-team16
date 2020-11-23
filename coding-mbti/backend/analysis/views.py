from json import JSONDecodeError
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from analysis.models import SolutionReport, UserReport
from problem.models import Solution
from user.models import Coder

@permission_classes((IsAuthenticated, ))
def my_report_view(request):

    if request.method == 'POST':
        try:
            solution1 = SolutionReport.objects.filter(
                title="ITP1_6_B_report").last().code
            solution2 = SolutionReport.objects.filter(
                title="ITP2_3_B_report").last().code

        except ObjectDoesNotExist as error:
            return HttpResponseBadRequest(error)
        try:
            user_report = UserReport(
                author=request.user, solution1=solution1, solution2=solution2,
                title=f"user{request.user.id}'s report")
            user_report.save()
        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)
        return HttpResponse(status=204)

    elif request.method == 'GET':
        try:
            user_report = UserReport.objects.filter(author__id=request.user.id).last().to_dict()
        except ObjectDoesNotExist as error:
            return HttpResponseBadRequest(error)
        return JsonResponse(user_report, status=200, safe=False)
    else:
        return HttpResponseNotAllowed(['UPDATE', 'DELETE'])


@permission_classes((IsAuthenticated, ))
def other_report_view(request, user_id=""):
    if request.method == "GET":
        try:
            user_report = UserReport.objects.filter(author__id=user_id).last().to_dict()
        except ObjectDoesNotExist as error:
            return HttpResponseBadRequest(error)
        return JsonResponse(user_report, status=200, safe=False)

    else :
        return HttpResponseNotAllowed(["POST","UPDATE", "DELETE"])


@permission_classes((IsAuthenticated, ))
def my_solutions_view(request):
    if request.method == "GET":
        try:
            solution1 = Solution.objects.filter(
                problem__pid="ITP1_6_B", author_id=request.user.id).last().to_dict()
            solution2 = Solution.objects.filter(
                problem__pid="ITP2_3_B", author_id=request.user.id).last().to_dict()
            response_dict = [solution1, solution2]
        except ObjectDoesNotExist as error:
            return HttpResponseBadRequest(error)
        return JsonResponse(response_dict, status=200, safe=False)

    else :
        return HttpResponseNotAllowed(["POST","UPDATE", "DELETE"])

@permission_classes((IsAuthenticated, ))
def other_solutions_view(request, user_id=""):
    if request.method == "GET":
        try:
            solution1 = Solution.objects.filter(
                problem__pid="ITP1_6_B", author_id=user_id).last().to_dict()
            solution2 = Solution.objects.filter(
                problem__pid="ITP2_3_B", author_id=user_id).last().to_dict()
            response_arr = [solution1, solution2]
        except ObjectDoesNotExist as error:
            return HttpResponseBadRequest(error)
        return JsonResponse(response_arr, status=200, safe=False)

    else :
        return HttpResponseNotAllowed(["POST","UPDATE", "DELETE"])


@permission_classes((IsAuthenticated, ))
def get_coders_by_style(request, style=""):
    if request.method =='GET':
        try :

            return JsonResponse(
            list(map(lambda coder: coder.to_dict(), Coder.objects.filter(style__style=int(style)))),
            status=200,
            safe=False,)
        except ObjectDoesNotExist as error:
            return HttpResponseBadRequest(error)
    else :
        return HttpResponseNotAllowed(['POST','PUT','DELETE'])

