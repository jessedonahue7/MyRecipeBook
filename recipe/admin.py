from django.contrib import admin
from .models import Recipe, Tag, Ingredient
# Register your models here.

class RecipeAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'prep_time', 'cook_time')
    filter_horizontal = ('ingredients', 'tags')
    
admin.site.register(Recipe, RecipeAdmin)