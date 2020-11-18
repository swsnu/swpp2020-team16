import json
from json import JSONDecodeError
import datetime
from pytz import utc

from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.db.utils import IntegrityError
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

from user.models import User, Coder, CodingStyle


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
        return JsonResponse({"token": token_auth.key})

    else:
        return HttpResponseNotAllowed(['POST'])


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
            User.objects.create_user(
                username=username, email=email, salt="", role=role, password=password)
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


def fake_return(style):
    expected_response = [{"user_id":1, "username":"hi", "style":style}, {"user_id":2, "username":"hello", "style":style},]
    return expected_response

@permission_classes((IsAuthenticated, ))
def get_coders_by_style(request, style=""):
    if request.method =='GET':
        try :

            return JsonResponse(fake_return(int(style)), status=200, safe=False)
            #return JsonResponse(
            #list(map(lambda coder: coder.to_dict(), Coder.objects.filter(style__style=int(style)))),
            #status=200,
            #safe=False,)
        except ObjectDoesNotExist as error:
            return HttpResponseBadRequest(error)
    else :
        return HttpResponseNotAllowed(['POST','PUT','DELETE'])
