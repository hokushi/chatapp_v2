from django.urls import path
from . import views

urlpatterns = [
    path("", views.BlogView, name="blog"),
    path("<int:post_id>", views.BlogDetailView, name="post_detail"),
    path("user", views.UserView, name="user"),
]
