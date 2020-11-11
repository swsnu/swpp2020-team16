from django.urls import path

from . import views

urlpatterns = [
    path("", views.problem_view),
    path("<int:objective>/", views.problem_by_objective_view),
    path("<int:problem_id>/solution/", views.solution_view),
    path("<int:problem_id>/input/", views.problem_input_view),
    path("<int:problem_input_id>/output/", views.problem_output_view),
]
