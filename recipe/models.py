from django.db import models
from django.template.defaultfilters import slugify
from users.models import Custom_User
from rest_framework.reverse import reverse

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

def upload_location(instance, filename):
    return "%s/%s" %(instance, filename)


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
    slug = models.SlugField(max_length=50, null=False, unique=True)
    image = models.ImageField(upload_to=upload_location, null=True, blank=True, width_field="width_field", height_field="height_field")
    height_field = models.IntegerField(default=0)
    width_field = models.IntegerField(default=0)
    
    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("detail", kwargs={"slug": self.slug})

    def save(self, *args, **kwargs): # new
        if not self.slug:
            self.slug = slugify(self.title)
        return super().save(*args, **kwargs)