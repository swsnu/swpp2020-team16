from django.urls import path

from . import views

urlpatterns = [
    path('', views.problem_view),
    path('<int:style_id>/', views.problem_by_style_id_view),
    path('<int:problem_id>/solution/', views.solution_view),
    path('<int:problem_id>/input/', views.problem_input_view),
    path('<int:problem_input_id>/output/', views.problem_output_view),
]
