from django.urls import path
from . import views

urlpatterns = [
    path('room', views.room),  # ここにGETでroom一覧、POSTでroom作成
    path('userinfo', views.user),  # ここにGETでuser一覧、POSTでuser作成
    path('room/<uuid:userid>', views.get_room_of_user),  # ここにGETでuserのroom一覧
    # ここにGETでroomのmessage一覧、POSTでmessage作成
    path('message/<int:roomid>', views.get_message_of_room),
]
