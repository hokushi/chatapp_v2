from django.urls import path
from . import views

urlpatterns = [
    path("user", views.UserView, name="user"),
    path("post", views.PostView, name="post"),
    path("post/<int:post_id>", views.PostDetailView, name="post_detail"),
]
