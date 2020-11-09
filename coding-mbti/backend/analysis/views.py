from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse

from analysis.models import SolutionReport


def provide_analysis_result(request, report_id):
    if request.method == 'GET':
        try:
            report = SolutionReport.objects.get(pk=report_id)

        except ObjectDoesNotExist:
            return HttpResponseBadRequest()

        return JsonResponse(report.to_dict(), status=200, safe=False)
    else:
        return HttpResponseNotAllowed(['POST', 'UPDATE', 'DELETE'])
