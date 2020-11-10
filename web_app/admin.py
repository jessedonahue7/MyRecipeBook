from django.contrib import admin

# Register your models here.
from .models import Recipe

class RecipeAdmin(admin.ModelAdmin):
    list_display = ("Name","Ingredients",)

admin.site.register(Recipe, RecipeAdmin)