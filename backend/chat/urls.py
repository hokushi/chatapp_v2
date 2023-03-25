from django.urls import path
from . import rest_views

urlpatterns = [
    # ここから下はrest_framework
    path("rest_room", rest_views.RoomView.as_view(), name="rest_room"),
    path("rest_user", rest_views.UserView.as_view(), name="rest_user"),
    path("rest_room/<uuid:userid>",
         rest_views.get_room_of_userView.as_view(), name="rest_user_room"),
    path("rest_room/<int:roomid>/message",
         rest_views.get_message_of_roomView.as_view(), name="rest_message_room"),
    path("rest_message/<int:message_id>",
         rest_views.MessageView.as_view(), name="rest_message"),

]
