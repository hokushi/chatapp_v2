from django.contrib import admin

# Register your models here.
from .models import Room
from .models import Message
from .models import UserInfo


admin.site.register(Message)
admin.site.register(Room)
admin.site.register(UserInfo)
