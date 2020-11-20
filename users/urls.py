from django.urls import path
from . import views
from .views import RegisterView, UserLoginView

urlpatterns = [
    path('register/', RegisterView.as_view(), name="register"),
    path('login/', UserLoginView.as_view(), name="login"),
    path("logout/", views.logout_request, name="logout"),
]