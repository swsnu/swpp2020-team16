from django.urls import path

from . import views

urlpatterns = [
    path('', views.group_view),
    path('<int:group_id>/members/', views.group_members_view),
    path('<int:group_id>/members/<int:member_id>/', views.group_members_id_view),
    path('<int:group_id>/', views.group_by_id_view),
    path('invite/', views.group_invite_view),
    path('invite/accept/<int:invitation_id>/',
         views.group_invite_accept_view),
    path('<int:group_id>/find_relation/', views.group_find_relation_view),
]
