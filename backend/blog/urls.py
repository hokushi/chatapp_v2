from django.urls import path
from . import views, rest_views

urlpatterns = [
    path("", views.BlogView, name="blog"),
    path("<int:post_id>", views.BlogDetailView, name="post_detail"),
    path("user", views.UserView, name="user"),
    path("rest_user", rest_views.UserView.as_view(), name="rest_user"),
    path("rest_user/<int:user_id>", rest_views.UserDetailView.as_view(), name="rest_user_detail"),
]
