from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User


class UserView(APIView):
    def get(self, request):
        users = User.objects.all()
        response = []
        for user in users:
            response.append({"id": user.id, "name": user.name, "email": user.email})
        return Response(response)

    def post(self, request):
        data = request.data
        user = User.objects.create(name=data["name"], email=data["email"], password=data["password"])
        return Response({"id": user.id}, status=status.HTTP_201_CREATED)


class UserDetailView(APIView):
    def get(self, request, user_id):
        user = User.objects.get(id=user_id)
        return Response({"id": user.id, "name": user.name, "email": user.email})

    def put(self, request, user_id):
        data = request.data
        user = User.objects.get(id=user_id)
        user.name = data["name"]
        user.email = data["email"]
        user.password = data["password"]
        user.save()
        return Response({"id": user.id}, status=status.HTTP_200_OK)

    def delete(self, request, user_id):
        user = User.objects.get(id=user_id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
