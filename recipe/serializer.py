from rest_framework import serializers
from users.serializer import UserDetailSerializer
from .models import Recipe, Tag, Ingredient

recipe_detail_url = serializers.HyperlinkedIdentityField(
    view_name='detail',
    lookup_field='slug'
)

recipe_delete_url = serializers.HyperlinkedIdentityField(
    view_name='delete',
    lookup_field='slug'
)

recipe_edit_url = serializers.HyperlinkedIdentityField(
    view_name='update',
    lookup_field='slug'
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

class RecipeListSerializer(serializers.ModelSerializer):
    url = recipe_detail_url
    class Meta:
        model = Recipe
        fields = (
             'id', 'title', 'image', 'url',
        )
        read_only_fields = ('id',)


class RecipeSerializer(serializers.ModelSerializer):
    ingredients = serializers.PrimaryKeyRelatedField(many=True, queryset=Ingredient.objects.all())
    tags = serializers.PrimaryKeyRelatedField(many=True, queryset=Tag.objects.all())
    url = recipe_detail_url
    class Meta:
        model = Recipe
        fields = (
             'id', 'title', 'ingredients', 'tags', 'prep_time', 'cook_time', 'image', 'url',
        )
        read_only_fields = ('id',)

class RecipeDetailSerializer(serializers.ModelSerializer):
    """Serialize a recipe detail"""
    user = UserDetailSerializer(read_only=True)
    ingredients = IngredientSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    edit_url = recipe_edit_url
    delete_url = recipe_delete_url

    class Meta:
        model = Recipe
        fields = (
             'user', 'ingredients', 'tags', 'prep_time', 'cook_time', 'edit_url', 'delete_url'
        )
        read_only_fields = ('user', 'edit_url', 'delete_url')

class RecipeEditSerializer(serializers.ModelSerializer):
    ingredients = serializers.PrimaryKeyRelatedField(many=True, queryset=Ingredient.objects.all())
    tags = serializers.PrimaryKeyRelatedField(many=True, queryset=Tag.objects.all())
    delete_url = recipe_delete_url
    class Meta:
        model = Recipe
        fields = (
             'id', 'title', 'ingredients', 'tags', 'prep_time', 'cook_time', 'delete_url',
        )
        read_only_fields = ('delete_url',)