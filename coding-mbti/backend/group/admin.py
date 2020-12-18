from django.contrib import admin
from group.models import Group, Invitation


class InvitationAdmin(admin.ModelAdmin):
    pass


class GroupAdmin(admin.ModelAdmin):
    pass


admin.site.register(Invitation, InvitationAdmin)
admin.site.register(Group, GroupAdmin)
