import json
from json import JSONDecodeError
import datetime
from pytz import utc

from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.db.utils import IntegrityError

from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

from user.models import User, Manager, Coder


@ensure_csrf_cookie
def signin(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            password = req_data['password']
        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)

        user = authenticate(username=username, password=password)
        if user is None:
            return HttpResponse(status=401)

        token_auth, created = Token.objects.get_or_create(user=user)
        if not created:
            token_auth.created = datetime.datetime.utcnow().replace(tzinfo=utc)
            token_auth.save()
        auth_login(request, user)
        return JsonResponse({"token": token_auth.key, "role": user.role})

    else:
        return HttpResponseNotAllowed(['POST'])


@ensure_csrf_cookie
def signup(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data["username"]
            email = req_data["email"]
            password = req_data["password"]
            role = req_data["role"]
        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)

        try:
            user = User.objects.create_user(
                username=username, email=email, salt="", role=role, password=password)
            if role == User.Role.Coder:
                Coder(user=user).save()
            elif role == User.Role.Manager:
                Manager(user=user).save()
        except IntegrityError:
            return HttpResponse(status=409)

        return HttpResponse(status=201)

    return HttpResponseNotAllowed(['POST'])


@permission_classes((IsAuthenticated, ))
def logout(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            request.user.auth_token.delete()
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


def qualified_view(request):
    if request.method == 'GET':
        if request.user.is_anonymous:
            return JsonResponse(False, safe=False)
        print(request.user)
        coder = Coder.objects.get(user=request.user)

        return JsonResponse(coder.is_qualified(), safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])
