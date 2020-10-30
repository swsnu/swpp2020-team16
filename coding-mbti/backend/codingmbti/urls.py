'''[doc] urls
'''

from django.urls import path

from . import views

urlpatterns = [
    path('name', views.name, name='name'),
    path('name/<int:name_id>', views.name, name='name_id'),
]
