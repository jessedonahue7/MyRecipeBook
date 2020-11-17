from django.conf.urls import url
from django.contrib import admin
from .views import RecipeListAPIView, RecipeCreateAPIView, RecipeUpdateAPIView, RecipeDetailAPIView, RecipeDeleteAPIView

urlpatterns = [
    url(r'^$', RecipeListAPIView.as_view(), name='list'),
    url(r'^create/$', RecipeCreateAPIView.as_view(), name='creat'),
    url(r'^(?P<title>[\w-]+)/$', RecipeDetailAPIView.as_view(), name='detail'),
    url(r'^(?P<title>[\w-]+)/edit/$', RecipeUpdateAPIView.as_view(), name='update'),
    url(r'^(?P<title>[\w-]+)/delete/$', RecipeDeleteAPIView.as_view(), name='delete'),
]