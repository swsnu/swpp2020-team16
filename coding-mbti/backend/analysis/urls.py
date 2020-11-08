from django.urls import path

from . import views

urlpatterns = [
    path('test/', views.provide_analysis_result, ),
]
