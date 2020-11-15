from json import JSONDecodeError
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from analysis.models import SolutionReport, UserReport


@permission_classes((IsAuthenticated, ))
def user_report_view(request):
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
        return JsonResponse(UserReport.objects.filter(author__id=request.user.id)
                            .last().to_dict(), status=200, safe=False)
    else:
        return HttpResponseNotAllowed(['UPDATE', 'DELETE'])


@permission_classes((IsAuthenticated, ))
def single_report_view(request):
    if request.method == 'GET':
        return JsonResponse(
            UserReport.objects.filter(
                author__id=request.user.id).first().to_dict(),
            status=200,
            safe=False,
        )
    else:
        return HttpResponseNotAllowed(['POST', 'UPDATE', 'DELETE'])


@permission_classes((IsAuthenticated, ))
def problem_report_view(request):
    if request.method == 'GET':
        reports = list(map(lambda report: report.to_dict(),
                           SolutionReport.objects.filter(author=request.user)))

        return JsonResponse(reports, status=200, safe=False)
    else:
        return HttpResponseNotAllowed(['POST', 'UPDATE', 'DELETE'])
