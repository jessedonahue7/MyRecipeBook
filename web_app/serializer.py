'''from rest_framework import serializers
from .models import Custom_User
from django.db.models import Q
from .models import Recipe


class HomePageView(TemplateView):
    template_name = 'home.html'

class SearchResultsView(ListView):
    model = Recipe
    template_name = 'search_results.html'

    def get_queryset(self): # new
        query = self.request.GET.get('q')
        object_list = Recipe.objects.filter(
            Q(Name__icontains=query) | Q(Ingredients__icontains=query)
        )
        return object_list'''