import json
from json import JSONDecodeError

from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from django.core.exceptions import ObjectDoesNotExist, PermissionDenied

from django.db import IntegrityError

from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from group.models import Group, Invitation
from user.models import User, Coder, Manager
from utils.utils import get_dicts_with_filter, get_dicts_with_all


@permission_classes((IsAuthenticated, ))
def group_members_view(request, group_id):
    if request.method == "GET":
        try:
            manager = Manager.objects.get(user=request.user)
            group = Group.objects.get(pk=group_id)
            if group.manager == manager:
                coders = get_dicts_with_filter(Coder.objects, group=group)
                return JsonResponse(coders, safe=False)
            else:
                return HttpResponseBadRequest()
        except ObjectDoesNotExist as error:
            return HttpResponseBadRequest(error)
    else:
        return HttpResponseNotAllowed(["GET"])


def group_members_id_view(request, group_id, member_id):
    if request.method == "DELETE":
        try:
            manager = Manager.objects.get(user=request.user)
            group = Group.objects.get(pk=group_id)
            if group.manager == manager:
                coder = Coder.objects.get(user__id=member_id)
                coder.group = None
                coder.save()
                return HttpResponse(status=204)
            else:
                return HttpResponseBadRequest()
        except ObjectDoesNotExist as error:
            return HttpResponseBadRequest(error)
    else:
        return HttpResponseNotAllowed(["DELETE"])


@permission_classes((IsAuthenticated, ))
def group_by_id_view(request, group_id):
    if request.method == "GET":
        try:
            return JsonResponse(Group.objects.get(pk=group_id).to_dict(), safe=False)
        except ObjectDoesNotExist as error:
            return HttpResponseBadRequest(error)
    elif request.method == "DELETE":
        try:
            group = Group.objects.get(pk=group_id)
            group.delete()
            return HttpResponse(status=204)
        except ObjectDoesNotExist as error:
            return HttpResponseBadRequest(error)
    else:
        return HttpResponseNotAllowed(["GET", "DELETE"])


@permission_classes((IsAuthenticated, ))
def group_view(request):
    if request.method == "GET":
        try:
            manager = Manager.objects.get(user=request.user)
            return JsonResponse(get_dicts_with_filter(Group.objects, manager=manager), safe=False)
        except ObjectDoesNotExist as error:
            return HttpResponseBadRequest(error)
    elif request.method == "POST":
        try:
            print(request.user)
            manager = Manager.objects.get(user=request.user)
            body = request.body.decode()
            name = json.loads(body)["name"]
        except (KeyError, JSONDecodeError, ObjectDoesNotExist) as error:
            return HttpResponseBadRequest(error)
        if Group.objects.filter(name=name).count() != 0:
            return HttpResponse(status=409)
        group = Group(name=name, manager=manager)
        group.save()

        return JsonResponse(group.to_dict(), status=201)
    else:
        return HttpResponseNotAllowed(["GET", "POST"])


@permission_classes((IsAuthenticated, ))
def group_invite_view(request):
    if request.method == "GET":
        try:
            coder = Coder.objects.get(user=request.user)
        except ObjectDoesNotExist:
            return HttpResponseBadRequest()
        invitations = get_dicts_with_filter(
            Invitation.objects, receiver=coder, is_accepted=False)
        return JsonResponse(invitations, safe=False)
    elif request.method == "POST":
        try:
            manager = Manager.objects.get(user=request.user)
            body = request.body.decode()
            receiver_id = json.loads(body)["receiver"]
            group_id = json.loads(body)["group"]
            receiver = Coder.objects.get(user__id=receiver_id)
            group = Group.objects.get(pk=group_id)
        except (KeyError, JSONDecodeError, ObjectDoesNotExist) as error:
            return HttpResponseBadRequest(error)

        invitation = Invitation(
            sender=manager, receiver=receiver, group=group)
        invitation.save()

        return JsonResponse(invitation.to_dict(), status=201)
    else:
        return HttpResponseNotAllowed(["GET", "POST"])


@ permission_classes((IsAuthenticated, ))
def group_invite_accept_view(request, invitation_id):
    if request.method == "GET":
        try:
            invitation = Invitation.objects.get(pk=invitation_id)
            invitation.accept(request.user)
        except (ObjectDoesNotExist, PermissionDenied) as error:
            return HttpResponseBadRequest(error)
        return HttpResponse(status=204)
    elif request.method == "DELETE":
        try:
            invitation = Invitation.objects.get(pk=invitation_id)
            if invitation.receiver.user != request.user and invitation.sender.user != request.user:
                return HttpResponseBadRequest()
            invitation.delete()
        except ObjectDoesNotExist as error:
            return HttpResponseBadRequest(error)

        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(["GET", "DELETE"])


def group_find_relation_view(request, group_id):
    if request.method == "GET":
        try:
            manager = Manager.objects.get(user=request.user)
            group = Group.objects.get(pk=group_id)
        except ObjectDoesNotExist as error:
            return HttpResponseBadRequest(error)
        if group.manager == manager:
            return JsonResponse(group.get_relations(Coder.objects.filter(group=group)), status=None)
        else:
            return HttpResponseBadRequest()
    else:
        return HttpResponseNotAllowed(["GET"])
