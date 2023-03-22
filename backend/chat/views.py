from django.shortcuts import render
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from .models import Room
from .models import Message
from .models import UserInfo
from django.utils import timezone


# Create your views here.
@csrf_exempt
def user(request):
    if request.method == 'GET':
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
        return JsonResponse(data, safe=False)

    if request.method == 'POST':
        datas = json.loads(request.body)
        print(datas)
        name = datas['name']
        userid = datas['userid']
        username = datas['username']
        email = datas['email']
        password = datas['password']
        UserInfo.objects.create(name=name, userid=userid, username=username,
                                email=email, password=password)
        return HttpResponse('user登録完了！')


@csrf_exempt
def room(request):
    if request.method == 'GET':
        rooms = Room.objects.all()
        data = []
        for room in rooms:
            data.append({
                'name': room.name,
                'id': room.id,
            })
        return JsonResponse(data, safe=False)

    if request.method == 'POST':
        datas = json.loads(request.body)
        name = datas['name']
        Room.objects.create(name=name)
        return HttpResponse('room登録完了！')


@csrf_exempt
def get_room_of_user(request, userid):
    if request.method == 'GET':
        user = UserInfo.objects.get(userid=userid)
        rooms = user.rooms.all()
        data = []
        for room in rooms:
            members = room.members.all()  # UserInfoインスタンスの配列
            members_data = []
            for member in members:
                members_data.append({
                    'name': member.name,
                    'userid': member.userid,
                    'username': member.username,
                    'email': member.email,
                    'password': member.password,
                })
            # members_dataは、Pythonの辞書の配列 (インスタンス→辞書に)
            # 辞書はJSONにできる、インスタンスはJSONにできない(not JSON serializableというエラーが出る)
            data.append({
                'name': room.name,
                'id': room.id,
                'members': members_data,
            })
        return JsonResponse(data, safe=False)


@csrf_exempt
def get_message_of_room(request, roomid):
    if request.method == 'GET':
        room = Room.objects.get(id=roomid)
        messages = room.messages.all()
        data = []
        for message in messages:
            data.append({
                'room': message.room.name,
                'senderID': message.sender.userid,
                'senderIcon': message.sender.id,
                'content': message.content,
                'created_at': [timezone.localtime(message.timestamp).month,
                               timezone.localtime(message.timestamp).day,
                               timezone.localtime(message.timestamp).hour,
                               timezone.localtime(message.timestamp).minute,]
            })
        return JsonResponse(data, safe=False)

    if request.method == 'POST':
        datas = json.loads(request.body)
        room = Room.objects.get(id=roomid)
        sender = UserInfo.objects.get(userid=datas['senderID'])
        content = datas['content']
        Message.objects.create(room=room, sender=sender,
                               content=content, timestamp=timezone.now())
        return HttpResponse('message登録完了！')
