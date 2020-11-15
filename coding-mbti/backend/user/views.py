import json
from json import JSONDecodeError
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from django.contrib.auth import authenticate, login, logout as auth_logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.db.utils import IntegrityError
from user.models import User


def signin(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({"id": user.pk})
        return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['POST'])


def signup(request):
    if request.method == 'POST':
        try:
            body = request.body.decode()
            username = json.loads(body)["username"]
            email = json.loads(body)["email"]
            password = json.loads(body)["password"]
            role = json.loads(body)["role"]
        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)
        try:
            User.objects.create_user(
                username=username, email=email, salt="", role=role, password=password)
        except IntegrityError:
            return HttpResponse(status=409)
        return HttpResponse(status=201)
    return HttpResponseNotAllowed(['POST'])


def logout(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            auth_logout(request)
            return HttpResponse(status=204)
        return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET'])


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    return HttpResponseNotAllowed(['GET'])
