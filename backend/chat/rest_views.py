from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from .models import Room
from .models import Message
from .models import UserInfo
from django.utils import timezone

# Create your views here.


class UserView(APIView):
    def get(self, request):
        users = UserInfo.objects.all()
        data = []
        for user in users:
            data.append({
                'name': user.name,
                'userid': user.userid,
                'username': user.username,
                'email': user.email,
                'password': user.password,
            })
        return Response(data)

    def post(self, request):
        datas = request.data
        print(datas)
        name = datas['name']
        userid = datas['userid']
        username = datas['username']
        email = datas['email']
        password = datas['password']
        UserInfo.objects.create(name=name, userid=userid, username=username,
                                email=email, password=password)
        return Response('user登録完了！')


class RoomView(APIView):
    def get(self, request):
        rooms = Room.objects.all()
        data = []
        for room in rooms:
            data.append({
                'name': room.name,
                'id': room.id,
            })
        return Response(data)

    def post(self, request):
        datas = request.data
        name = datas['name']
        Room.objects.create(name=name)
        return Response('room登録完了！')


class MessageView(APIView):
    def delete(self, request, message_id):
        message = Message.objects.get(id=message_id)
        message.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class get_room_of_userView(APIView):
    def get(self, request, userid):
        user = UserInfo.objects.get(userid=userid)
        rooms = user.rooms.all()
        data = []
        for room in rooms:
            members = room.members.all()
            members_data = []
            for member in members:
                members_data.append({
                    'name': member.name,
                    'userid': member.userid,
                    'username': member.username,
                    'email': member.email,
                    'password': member.password,
                })
            data.append({
                'name': room.name,
                'id': room.id,
                'members': members_data,
            })
        return Response(data)


class get_message_of_roomView(APIView):
    def get(self, request, roomid):
        room = Room.objects.get(id=roomid)
        messages = room.messages.all()
        data = []
        for message in messages:
            data.append({
                "room": message.room.name,
                "senderID": message.sender.userid,
                'senderIcon': message.sender.id,
                'content': message.content,
                'content_id': message.id,
                'created_at': [timezone.localtime(message.timestamp).month,
                               timezone.localtime(message.timestamp).day,
                               timezone.localtime(message.timestamp).hour,
                               timezone.localtime(message.timestamp).minute,]
            })
        return Response(data)

    def post(self, request, roomid):
        datas = request.data
        room = Room.objects.get(id=roomid)
        sender = UserInfo.objects.get(userid=datas['senderID'])
        content = datas['content']
        Message.objects.create(room=room, sender=sender,
                               content=content, timestamp=timezone.now())
        return Response('message登録完了！')
