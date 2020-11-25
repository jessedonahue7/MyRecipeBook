from rest_framework import serializers
from users.serializer import UserDetailSerializer
from .models import Recipe, Tag, Ingredient

recipe_detail_url = serializers.HyperlinkedIdentityField(
    view_name='detail',
    #lookup_field='slug'
)

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name')
        read_only_fields = ('id',)

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('id', 'name')
        read_only_fields = ('id',)

class RecipeSerializer(serializers.ModelSerializer):
    ingredients = serializers.PrimaryKeyRelatedField(many=True, queryset=Ingredient.objects.all())
    tags = serializers.PrimaryKeyRelatedField(many=True, queryset=Tag.objects.all())
    #url = recipe_detail_url
    class Meta:
        model = Recipe
        fields = (
             'id', 'title', 'ingredients', 'tags', 'prep_time', 'cook_time'#, 'url',
        )
        read_only_fields = ('id',)

class RecipeDetailSerializer(serializers.ModelSerializer):
    """Serialize a recipe detail"""
    #user = UserDetailSerializer(read_only=True)
    ingredients = IngredientSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Recipe
        fields = (
            'id', 'ingredients', 'tags'
        )
        read_only_fields = ('id',)