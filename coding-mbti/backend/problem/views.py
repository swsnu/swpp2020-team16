import json
from json import JSONDecodeError

from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponseBadRequest, HttpResponseNotAllowed, HttpResponse
from analysis.models import SolutionReport
from problem.models import Solution, Problem


def solution_view(request, problem_id):
    if request.method == 'POST':
        try:
            problem = Problem.objects.get(pk=problem_id)
        except ObjectDoesNotExist:
            return HttpResponseBadRequest()

        try:
            body = request.body.decode()
            content = json.loads(body)['content']
            erase_cnt = json.loads(body)['erase_cnt']
        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)

        solution = Solution(
            problem=problem, content=content, erase_cnt=erase_cnt)
        solution.save()

        SolutionReport(solution=solution, author=request.user,
                       title=f'{problem.name}_report').save()

        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET', 'UPDATE', 'DELETE'])
