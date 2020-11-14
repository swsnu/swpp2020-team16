from json import JSONDecodeError
from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from user.models import User
from analysis.models import SolutionReport, UserReport


@csrf_exempt
def user_report_view(request):
    if request.method == 'POST':
        try:
            print(SolutionReport.objects.filter(
                title="ITP1_6_B_report").last().to_dict())
            solution1 = SolutionReport.objects.filter(
                title="ITP1_6_B_report").last().code

            solution2 = SolutionReport.objects.filter(
                title="ITP2_3_B_report").last().code

        except ObjectDoesNotExist as error:
            return HttpResponseBadRequest(error)
        try:
            if request.user.is_anonymous:
                request.user = User.objects.filter(username="admin").first()
            user_report = UserReport(
                author=request.user,
                solution1=solution1,
                solution2=solution2,
                title=f"user{request.user.id}'s report")
            user_report.save()
        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)
        return HttpResponse(status=204)

    elif request.method == 'GET':
        try:
            if request.user.is_anonymous:
                request.user = User.objects.filter(username="admin").first()
            return JsonResponse(UserReport.objects.filter(author__id=request.user.id)
                                .last().to_dict(), status=200, safe=False)
        except:
            return HttpResponseBadRequest()
    else:
        return HttpResponseNotAllowed(['UPDATE', 'DELETE'])


def single_report_view(request):
    if request.method == 'GET':
        try:
            return JsonResponse(
                UserReport.objects.filter(
                    author__id=request.user.id).first().to_dict(),
                status=200,
                safe=False,
            )
        except ObjectDoesNotExist as error:
            return HttpResponseBadRequest(error)
    else:
        return HttpResponseNotAllowed(['POST', 'UPDATE', 'DELETE'])


def problem_report_view(request):
    if request.method == 'GET':
        try:
            if request.user.is_anonymous:
                request.user = User.objects.get(pk=1)
            reports = list(map(lambda report: report.to_dict(),
                               SolutionReport.objects.filter(author=request.user)))

        except ObjectDoesNotExist:
            return HttpResponseBadRequest()

        return JsonResponse(reports, status=200, safe=False)
    else:
        return HttpResponseNotAllowed(['POST', 'UPDATE', 'DELETE'])
