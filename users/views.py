from django.contrib.auth import get_user_model
from rest_framework import generics, status
from django.contrib import auth
from django_project import helpers
from rest_framework.permissions import (
   AllowAny,
   IsAuthenticated,
   IsAdminUser,
   IsAuthenticatedOrReadOnly,
)
from .serializer import RegisterSerializer, UserLoginSerializer
from rest_framework.response import Response
#create your views here

class RegisterView(generics.CreateAPIView):
   serializer_class = RegisterSerializer
   User = get_user_model()
   queryset = User.objects.all()

""" def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        user_data = serializer.data

        return Response(user_data,status=status.HTTP_201_CREATED) """

class UserLoginView(generics.GenericAPIView):
   permission_classes = [AllowAny]
   serializer_class = UserLoginSerializer

   def post(self,request):
      data = request.data
      serializer = UserLoginSerializer(data=data)

      if serializer.is_valid(raise_exception=True):
         new_data = serializer.data
         return Response(new_data, status=status.HTTP_200_OK)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

 def logout_request(request):
        logout(request)
    messages.info(request, "Logged out successfully!")
    return redirect("main:homepage")