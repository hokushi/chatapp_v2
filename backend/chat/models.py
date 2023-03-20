from django.db import models


class UserInfo(models.Model):
    name = models.CharField(max_length=255)
    username = models.CharField(max_length=255, unique=True)
    userid = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Room(models.Model):
    name = models.CharField(max_length=255)
    members = models.ManyToManyField(UserInfo, related_name='rooms')

    def __str__(self):
        return self.name


class Message(models.Model):
    room = models.ForeignKey(
        Room, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(
        UserInfo, on_delete=models.CASCADE, related_name='messages_sent')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content
