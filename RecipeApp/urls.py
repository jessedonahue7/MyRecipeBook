"""RecipeApp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from users import views as user_views
from recipe import views as recipe_views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView 

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include('users.urls')),
    path('admin/', admin.site.urls),
    path('recipe/', include('recipe.urls')),
]

'''
curl \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjA1ODk5MjIyLCJqdGkiOiJlZTI3MWJiNDg0ZWU0YWNiYThjNWIyOWRhOTQ4OTY3MSIsInVzZXJfaWQiOjR9.pGMRLtcfbW6mrPM0lzjJs0SU4VO7gCWW79tPf0zkF4w" \http://127.0.0.1/:8000/api/some-protected-view/token/

'''