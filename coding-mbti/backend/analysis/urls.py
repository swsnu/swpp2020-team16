from django.urls import path

from . import views

urlpatterns = [
    path(
        "/",
        views.user_report,
    ),
    path(
        "<int:report_id>/",
        views.single_report,
    ),
]
