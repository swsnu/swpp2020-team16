from django.urls import path

from . import views

urlpatterns = [
    path("", views.problem_view),
    path("objective/", views.problem_by_objective_view),
    path("<int:problem_id>/", views.problem_by_id_view),
    path("<int:problem_id>/solution/", views.solution_view),
    path("<int:problem_id>/input/", views.problem_input_view),
    path("<int:problem_input_id>/output/", views.problem_output_view),
    path("<int:problem_id>/solution/<int:user_id>",
         views.solution_for_others_view)
]
