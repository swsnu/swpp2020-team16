from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse

from analysis.models import SolutionReport, UserReport

def user_report(request):
    if request.method == 'POST':
        try :
            solution1 = SolutionReport.objects.filter(author__id=request.user.id,title="ITP1_6_B_report").first().content
            solution2 = SolutionReport.objects.filter(author__id=request.user.id,title="ITP2_3_B_report").first().content
        except ObjectDoesNotExist as error:
            return HttpResponseBadRequest(error)
        try:
            user_report = UserReport(author=request.user, solution1=solution1, solution2=solution2)
        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)
        return HttpResponse(status=204)

    else if request.method == 'GET':
        try :
            return JsonResponse(UserReport.objects.filter(request.user.id).first().to_dict(), status=200, safe=False)
        else :
            return HttpResponseBadRequest()
    else :
        return HttpResponseNotAllowed(['UPDATE', 'DELETE'])

    

def single_report(request, report_id):
    if request.method == 'GET':
        try:
            report = SolutionReport.objects.get(pk=report_id)

        except ObjectDoesNotExist:
            return HttpResponseBadRequest()

        return JsonResponse(report.to_dict(), status=200, safe=False)
    else:
        return HttpResponseNotAllowed(['POST', 'UPDATE', 'DELETE'])
