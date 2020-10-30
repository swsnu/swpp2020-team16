'''
  [doc] view
'''
import json
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Name


@csrf_exempt
def index(request, name_id=None):
    '''이름을 GET, POST, DELETE 할 수 있는 view.

    :param `wsgiRequests` request: a request from frontend
    :param int name_id: the id of name instance

    이 뷰 함수는 사용하지 않습니다. 원활한 개발을 위한 예시 모델입니다.
    '''
    if request.method == 'GET':
        if name_id is None:
            # get all
            name_all_list = list(Name.objects.all().values())
            return JsonResponse(name_all_list, safe=False)
        else:
            try:
                name = Name.objects.get(id=name_id)
                response_dict = {
                    'id': name.id,
                    'name': name.name,
                }
                return JsonResponse(response_dict, safe=False)
            except KeyError:
                return HttpResponseBadRequest(f'NameID does not exist: {name_id}')
    if request.method == 'POST':
        try:
            body = request.body.decode()
            name = json.loads(body)['name']
        except (KeyError, json.JSONDecodeError):
            return HttpResponseBadRequest()
        name_obj = Name(name=name, done=False)
        name_obj.save()
        response_dict = {
            'id': name_obj.id,
            'name': name_obj.name,
        }
        return JsonResponse(response_dict)
    elif request.method == 'DELETE':
        if name_id is None:
            return HttpResponseBadRequest('name_id is not specified.')
        try:
            name = Name.objects.get(id=name_id)
            name.delete()
        except KeyError:
            return HttpResponseBadRequest(f'name_id does not exist: {name_id}')
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET', 'POST', 'DELETE'])
