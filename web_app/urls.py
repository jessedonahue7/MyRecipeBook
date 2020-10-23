from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home-page'),
    path('About', views.about, name='About-page'),
]