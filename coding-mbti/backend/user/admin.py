from django.contrib import admin
from user.models import User, Manager, Coder, CodingStyle


class UserAdmin(admin.ModelAdmin):
    pass


class CoderAdmin(admin.ModelAdmin):
    pass


class CodingStyleAdmin(admin.ModelAdmin):
    pass


class ManagerAdmin(admin.ModelAdmin):
    pass


class CoderAdmin(admin.ModelAdmin):
    pass


class CodingSytleAdmin(admin.ModelAdmin):
    pass


admin.site.register(User, UserAdmin)
admin.site.register(Manager, ManagerAdmin)
admin.site.register(Coder, CoderAdmin)
admin.site.register(CodingStyle, CodingSytleAdmin)
