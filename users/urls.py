from django.urls import path
from .views import RegisterView, UserLoginView, LogoutAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView 

urlpatterns = [
    path('register/', RegisterView.as_view(), name="register"),
    path('login/', UserLoginView.as_view(), name="login"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
]

