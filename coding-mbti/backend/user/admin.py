from django.contrib import admin
from user.models import User, Coder, CodingStyle



class UserAdmin(admin.ModelAdmin):
    pass

class CoderAdmin(admin.ModelAdmin):
    pass


class CodingStyleAdmin(admin.ModelAdmin):
    pass



admin.site.register(User, UserAdmin)
admin.site.register(Coder, CoderAdmin)
admin.site.register(CodingStyle, CodingStyleAdmin)
