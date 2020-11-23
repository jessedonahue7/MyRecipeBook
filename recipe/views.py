from django.db.models import Q
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import generics
from .models import Recipe, Tag, Ingredient
from .serializer import RecipeSerializer, RecipeDetailSerializer
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
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    filter_backends = [SearchFilter]
    search_fields = ['title', 'tag', 'user__username']
    pagination_class = RecipePageNumberPagination #PageNumberPagination

    def get_queryset(self, *args, **kwargs):
        #queryset_list = Recipe.objects.all()
        query = self.request.GET.get("q")
        if query:
            queryset_list = queryset_list.filter(
                Q(title__icontains=query)|
                Q(tag__icontains=query)|
                Q(user__email__icontains=query)|
                Q(user__username__icontains=query)
            ).distinct()

class RecipeDetailAPIView(generics.RetrieveAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeDetailSerializer
    lookup_field = 'title'

class RecipeUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeDetailSerializer
    lookup_field = 'title'
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

class RecipeDeleteAPIView(generics.DestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeDetailSerializer
    lookup_field = 'title'
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]


