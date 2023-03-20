from django.shortcuts import render
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from .models import Room
from .models import Message
from .models import UserInfo
from django.utils import timezone
from django.contrib.auth.models import User


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
