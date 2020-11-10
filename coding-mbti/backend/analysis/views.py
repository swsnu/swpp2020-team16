from django.core.exceptions import ObjectDoesNotExist
from django.http import (
    HttpResponseBadRequest,
    HttpResponseNotAllowed,
    JsonResponse,
    HttpResponse,
)
from analysis.models import SolutionReport, UserReport


def user_report_view(request):
    if request.method == "POST":
        try:
            solution1 = (
                SolutionReport.objects.filter(
                    author__id=request.user.id, title="ITP1_6_B_report"
                )
                .first()
                .content
            )
            solution2 = (
                SolutionReport.objects.filter(
                    author__id=request.user.id, title="ITP2_3_B_report"
                )
                .first()
                .content
            )
        except ObjectDoesNotExist as error:
            return HttpResponseBadRequest(error)
        try:
            UserReport(
                author=request.user, solution1=solution1, solution2=solution2
            ).save()
        except:
            return HttpResponseBadRequest()

        return HttpResponse(status=204)

    elif request.method == "GET":
        try:
            return JsonResponse(
                UserReport.objects.filter(author__id=request.user.id).first().to_dict(),
                status=200,
                safe=False,
            )
        except ObjectDoesNotExist as error:
            return HttpResponseBadRequest(error)
    else:
        return HttpResponseNotAllowed(["UPDATE", "DELETE"])
