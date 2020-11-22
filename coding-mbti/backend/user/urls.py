from django.urls import path
from user import views

urlpatterns = [
    path('login/', views.signin),
    path('signup/', views.signup),
    path('logout/', views.logout),
    path('token/', views.token),
]
