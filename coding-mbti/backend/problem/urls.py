from django.urls import path

from . import views

urlpatterns = [
    path('', views.problem_view),
    path('<int:problem_id>/solution/', views.solution_view),
]
