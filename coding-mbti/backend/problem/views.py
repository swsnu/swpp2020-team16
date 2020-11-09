import json
from json import JSONDecodeError

from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponseBadRequest, HttpResponseNotAllowed, HttpResponse
from analysis.models import SolutionReport
from problem.models import Solution, Problem


def solution_view(request):
    if request.method == 'POST':
        try:
            body = request.body.decode()
            problem_id = json.loads(body)['problem']
            content = json.loads(body)['content']
            erase_cnt = json.loads(body)['erase_cnt']

        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)
        try:
            problem = Problem.objects.get(pk=problem_id)
        except ObjectDoesNotExist:
            return HttpResponseBadRequest()
        solution = Solution(
            problem=problem, content=content, erase_cnt=erase_cnt)
        solution.save()

        SolutionReport(solution=solution, author=request.user,
                       title=f'{problem.name}_report').save()

        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET', 'UPDATE', 'DELETE'])
