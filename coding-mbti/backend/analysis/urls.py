from django.urls import path

from . import views

urlpatterns = [
    path('', views.user_report_view),
    path('problem_report/<int:report_id>/', views.single_report_view),
    path('problem_report/', views.problem_report_view),
]
