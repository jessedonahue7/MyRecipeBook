from django.db.models import Q
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import generics
from rest_framework import viewsets, mixins, status

from .models import Recipe, Tag, Ingredient
from .serializer import RecipeSerializer, RecipeDetailSerializer, TagSerializer, IngredientSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from .permissions import IsOwnerOrReadOnly
from .pagination import RecipeLimitOffsetPagination, RecipePageNumberPagination

class RecipeCreateAPIView(generics.CreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [AllowAny] #[IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        

class RecipeListAPIView(generics.ListAPIView):
    serializer_class = RecipeSerializer
    filter_backends = [SearchFilter]
    search_fields = ['title', 'tags__name', 'ingredients__name', 'user__username']
    pagination_class = RecipePageNumberPagination #PageNumberPagination

    def get_queryset(self, *args, **kwargs):
        queryset_list = Recipe.objects.all()
        query = self.request.GET.get("q")
        if query:
            queryset_list = queryset_list.filter(
                Q(title__icontains=query)|
                Q(tags__id__icontains=query)|
                Q(user__email__icontains=query)|
                Q(user__username__icontains=query)
            ).distinct()
        return queryset_list

class RecipeDetailAPIView(generics.RetrieveAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeDetailSerializer
    lookup_field = 'slug'

class RecipeUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeDetailSerializer
    lookup_field = 'slug'
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

class RecipeDeleteAPIView(generics.DestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeDetailSerializer
    lookup_field = 'slug'
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]


class TagViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.CreateModelMixin):
    """Manage tags in the database"""
    permission_classes = [IsAuthenticated,]
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class IngredientViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.CreateModelMixin):
    """Manage ingredients in the database"""
    permission_classes = [IsAuthenticated,]
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user).order_by('-name')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


