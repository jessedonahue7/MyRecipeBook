from django.db import models
from users.models import Custom_User

User = Custom_User

class Tag(models.Model):
    """Tag to be used for a recipe"""
    name = models.CharField(max_length=255)
    user = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.name


class Ingredient(models.Model):
    """Ingredient to be used in a recipe"""
    name = models.CharField(max_length=255)
    user = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name


class Recipe(models.Model):
    """Recipe object"""
    user = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE
    )
    title = models.CharField(max_length=255)
    prep_time = models.IntegerField()
    cook_time = models.IntegerField()
    ingredients = models.ManyToManyField('Ingredient')
    tags = models.ManyToManyField('Tag')
    slug = models.SlugField(max_length=50, blank=False, default='title')
    url = models.CharField(max_length=255, blank=True)
    #image = models.ImageField(null=True, )

    def __str__(self):
        return self.title