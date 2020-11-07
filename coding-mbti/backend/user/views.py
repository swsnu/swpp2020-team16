from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import User
import json
from json import JSONDecodeError

def signup(request):
    if request.method =='GET':
        return HttpResponse(status=405)
    if request.method =='PUT':
        return HttpResponse(status=405)
    if request.method =='DELETE':
        return HttpResponse(status=405)
    req_data = json.loads(request.body.decode())
    username = req_data['username']
    password = req_data['password']
    email = req_data['email']
    salt= req_data['salt']
    role = req_data['role']
    User.objects.create_user(username=username, password=password, email=email, salt=salt, role=role)
    return HttpResponse(status=201)

@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=405)
