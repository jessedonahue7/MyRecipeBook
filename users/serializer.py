from rest_framework import serializers
from .models import Custom_User
from django.db.models import Q

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Custom_User
        fields = ['email']

class RegisterSerializer(serializers.ModelSerializer):
    password=serializers.CharField(max_length=68, min_length=8, write_only = True)
   # email2 = serializers.EmailField(label='Confirm Email')
    class Meta:
        model=Custom_User
        fields=['email', 'username','password']

    def validate(self, attrs):
        email=attrs.get('email', '')
        username=attrs.get('username','')
        return super().validate(attrs)

        if not username.isalnum():

            raise serializers.ValidationError('the username should only contain alphanumeric characters')
        return attrs

   # def validate_email2(self, value):
    #    data = self.get_initial()
    #   email = data.get("email")
     #   email2 = value
      #  if email != email2:
       #     raise serializers.ValidationError("Emails don't match!")
        #return value

    def create(self, validated_data):
        return Custom_User.objects.create_user(**validated_data)

class UserLoginSerializer(serializers.ModelSerializer):
    tokens = serializers.CharField(allow_blank=True, read_only=True)
    username = serializers.CharField(required=False, allow_blank=True)
    email = serializers.EmailField(label='Email Address', required=False, allow_blank=True)

    class Meta:
        model = Custom_User
        fields = ['username', 'email', 'password', 'tokens']
        extra_kwargs = {"password":
                            {"write_only": True}
                            }
    
    def validate(self, data):
        user_obj = None
        email = data.get("email", None)
        username = data.get("username", None)
        password = data["password"]

        if not email or not username:
            raise serializers.ValidationError("A username or email is required to login")

        user = Custom_User.objects.filter(
            Q(email = email) |
            Q(username=username)
        ).distinct()
        user = user.exclude(email__isnull=True).exclude(email__iexact='')

        if user.exists() and user.count() == 1:
            user_obj = user.first()
        else:
            raise serializers.ValidationError("This username/email is not valid.")

        if user_obj:
            if not user_obj.check_password(password):
                raise serializers.ValidationError("Incorrect credentials please try again.")
        
        data["tokens"] = user_obj.tokens
        return data
