from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt

import json

from .models import Name

@csrf_exempt
def index(request, id=None):
    if request.method == 'GET':
        if id is None:
            # get all
            name_all_list = list(Name.objects.all().values())
            return JsonResponse(name_all_list, safe=False)
        else:
            try:
                name = Name.objects.get(id=id)
                response_dict = {
                        'id': name.id,
                        'name': name.name,
                        }
                return JsonResponse(response_dict, safe=False)
            except KeyError as e:
                return HttpResponseBadRequest(f'NameID does not exist: {id}')
    if request.method == 'POST':
        try:
            body = request.body.decode()
            name = json.loads(body)['name']
        except (KeyError, json.JSONDecodeError) as e:
            return HttpResponseBadRequest()
        name_obj = Name(name=name, done=False)
        name_obj.save()
        response_dict = {
            'id': name_obj.id,
            'name': name_obj.name,
        }
        return HttpResponse(json.dumps(response_dict), status=201)
    elif request.method == 'DELETE':
        if id is None:
            return HttpResponseBadRequest('NameID is not specified.')
        try:
            name = Name.objects.get(id=id)
            name.delete()
        except KeyError as e:
            return HttpResponseBadRequest(f'NameID does not exist: {id}')
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET', 'POST', 'DELETE'])


# Create your views here.
