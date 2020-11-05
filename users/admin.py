from django.contrib import admin
from .models import Custom_User
# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'password')

admin.site.register(Custom_User, UserAdmin)
