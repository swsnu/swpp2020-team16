from django.contrib import admin
from .models import SolutionReport


class SolutionReportAdmin(admin.ModelAdmin):
    pass


admin.site.register(SolutionReport, SolutionReportAdmin)
