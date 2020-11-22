from django.contrib import admin
from analysis.models import SolutionReport, UserReport

class SolutionReportAdmin(admin.ModelAdmin):
    pass

class UserReportAdmin(admin.ModelAdmin):
    pass


admin.site.register(SolutionReport, SolutionReportAdmin)
admin.site.register(UserReport, UserReportAdmin)
