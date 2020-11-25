from django.conf.urls import url
from django.urls import path, include
from django.contrib import admin
from .views import RecipeListAPIView, RecipeCreateAPIView, RecipeUpdateAPIView, RecipeDetailAPIView, RecipeDeleteAPIView, TagViewSet, IngredientViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('tags', TagViewSet)
router.register('ingredients', IngredientViewSet)

urlpatterns = [
    url(r'^list/$', RecipeListAPIView.as_view(), name='list'),
    url(r'^create/$', RecipeCreateAPIView.as_view(), name='create'),
    #url(r'^(?P<slug>[\w-]+)/$', RecipeDetailAPIView.as_view(), name='detail'),
    url(r'^(?P<slug>[\w-]+)/edit/$', RecipeUpdateAPIView.as_view(), name='update'),
    url(r'^(?P<slug>[\w-]+)/delete/$', RecipeDeleteAPIView.as_view(), name='delete'),

   path('', include(router.urls))
]