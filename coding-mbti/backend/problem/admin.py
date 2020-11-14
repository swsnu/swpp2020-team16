from django.contrib import admin
from problem.models import Problem, Solution, ProblemInput, ProblemOutput


class ProblemAdmin(admin.ModelAdmin):
    pass

class SolutionAdmin(admin.ModelAdmin):
    pass


class ProblemInputAdmin(admin.ModelAdmin):
    pass

class ProblemOutputAdmin(admin.ModelAdmin):
    pass

admin.site.register(Problem, ProblemAdmin)
admin.site.register(Solution, SolutionAdmin)
admin.site.register(ProblemInput, ProblemInputAdmin)
admin.site.register(ProblemOutput, ProblemOutputAdmin)
