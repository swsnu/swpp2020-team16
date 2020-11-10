from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse

from analysis.models import SolutionReport
from user.models import User


def provide_analysis_result(request, report_id):
    if request.method == 'GET':
        try:
            report = SolutionReport.objects.get(pk=report_id)

        except ObjectDoesNotExist:
            return HttpResponseBadRequest()

        return JsonResponse(report.to_dict(), status=200, safe=False)
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
