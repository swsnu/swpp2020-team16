from django.urls import path

from . import views

urlpatterns = [
    path('my/report/', views.my_report_view),
    path('my/solutions/', views.my_solutions_view),
    path('other/<int:user_id>/solutions/', views.other_solutions_view),
    path('other/<int:user_id>/report/', views.other_report_view),
    path('style/<int:style>/', views.get_coders_by_style),
    path('global/report/', views.global_report_view),
    path('global/report/api/', views.global_report_api_view),
]
