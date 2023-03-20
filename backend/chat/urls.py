from django.urls import path
from . import views

urlpatterns = [
    path('room', views.room),  # ここにGETでroom一覧、POSTでroom作成
    path('user', views.user),  # ここにGETでuser一覧、POSTでuser作成
]
