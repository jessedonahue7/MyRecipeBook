from django.db import models

# Create your models here.
class Recipe(models.Model):
    Name = models.CharField(max_length=255)
    Rating = models.CharField(max_length=255)
    Ease_of_Prep = models.CharField(max_length=255)
    Notes = models.CharField(max_length=255)
    Type = models.IntegerField()
    Prep_Time = models.IntegerField()
    Photo = models.CharField(max_length=255)
    Cookbook = models.CharField(max_length=255)
    Page = models.CharField(max_length=255)
    Ingredients = models.CharField(max_length=255)
    Slowcooker = models.CharField(max_length=255)
    Link = models.CharField(max_length=255)
    Last_Made = models.CharField(max_length=255)
    Make_It_Next = models.CharField(max_length=255)
    RecipeID = models.IntegerField()

    class meta:
        verbose_name_plural = 'Recipes'
    def __str__(self):
        return self.Name