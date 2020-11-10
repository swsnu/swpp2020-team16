from django.urls import path

from . import views

urlpatterns = [
    path('problem_report/<int:report_id>/', views.provide_analysis_result, ),
    path('problem_report/', views.problem_report_view, ),
]
