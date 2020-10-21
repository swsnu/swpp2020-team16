'''[doc] urls
'''

from django.urls import path

from . import views

urlpatterns = [
    path('', views.index),
    path('<int:name_id>', views.index),
]
