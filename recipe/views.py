from rest_framework import generics
from .models import Recipe, Tag, Ingredient
from .serializer import RecipeSerializer, RecipeDetailSerializer

class RecipeCreateAPIView(generics.CreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

class RecipeListAPIView(generics.ListAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

class RecipeDetailAPIView(generics.RetrieveAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeDetailSerializer
    lookup_field = 'title'

class RecipeUpdateAPIView(generics.UpdateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeDetailSerializer
    lookup_field = 'title'

class RecipeDeleteAPIView(generics.DestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeDetailSerializer
    lookup_field = 'title'


