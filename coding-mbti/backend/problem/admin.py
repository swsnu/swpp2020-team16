from django.contrib import admin
from problem.models import Problem


class ProblemAdmin(admin.ModelAdmin):
    pass


admin.site.register(Problem, ProblemAdmin)
