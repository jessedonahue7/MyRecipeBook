from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination

class RecipeLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 3
    max_limit = 5

class RecipePageNumberPagination(PageNumberPagination):
    page_size = 5