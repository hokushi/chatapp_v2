# よく使うステータスコード一覧
# 200 OK
# 201 Created
# 204 No Content
# 400 Bad Request
# 401 Unauthorized
# 403 Forbidden
# 404 Not Found
# 405 Method Not Allowed
# 500 Internal Server Error


# よく使うクエリセット一覧
# 基本: https://qiita.com/uenosy/items/54136aff0f6373957d22
# ManyToMany: https://djangobrothers.com/blogs/many_to_many_object/

# 必要なAPI
# 1. ユーザー登録
# 2. ユーザーを指定してブログを投稿する
# 3. ブログの一覧を取得する
# 4. ブログの詳細を取得する
# 5. ブログを更新する
# 6. ブログを削除する

from .models import User, Post, Tag
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def UserView(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user = User.objects.create(name=data["name"], email=data["email"], password=data["password"])
        return JsonResponse({"id": user.id}, status=201)

    return JsonResponse({"error": "Method Not Allowed"}, status=405)


@csrf_exempt
def PostView(request):
    if request.method == "POST":
        data = json.loads(request.body)
        post = Post.objects.create(
            title=data["title"],
            content=data["content"],
            author=get_object_or_404(User, id=data["author_id"]),
        )
        post.tags.set(Tag.objects.filter(id__in=data["tag_ids"]))
        return JsonResponse(
            {
                "id": post.id,
                "title": post.title,
                "content": post.content,
                "author": {
                    "id": post.author.id,
                    "name": post.author.name,
                    "email": post.author.email,
                },
            },
            status=201,
        )

    if request.method == "GET":
        posts = Post.objects.all()
        return JsonResponse(
            [
                {
                    "id": post.id,
                    "title": post.title,
                    "content": post.content,
                    "created_at": post.created_at,
                    "updated_at": post.updated_at,
                    "author": {
                        "id": post.author.id,
                        "name": post.author.name,
                        "email": post.author.email,
                    },
                    "tags": [{"id": tag.id, "name": tag.name} for tag in post.tags.all()],
                }
                for post in posts
            ],
            status=200,
            safe=False,
        )

    return JsonResponse({"error": "Method Not Allowed"}, status=405)


@csrf_exempt
def PostDetailView(request, post_id):
    if request.method == "GET":
        post = get_object_or_404(Post, id=post_id)
        return JsonResponse(
            {
                "id": post.id,
                "title": post.title,
                "content": post.content,
                "created_at": post.created_at,
                "updated_at": post.updated_at,
                "author": {
                    "id": post.author.id,
                    "name": post.author.name,
                    "email": post.author.email,
                },
                "tags": [{"id": tag.id, "name": tag.name} for tag in post.tags.all()],
            },
            status=200,
        )

    if request.method == "PUT":
        data = json.loads(request.body)
        post = get_object_or_404(Post, id=post_id)
        post.title = data["title"]
        post.content = data["content"]
        post.author = User.objects.get(id=data["author_id"])
        post.tags.set(Tag.objects.filter(id__in=data["tag_ids"]))
        post.save()
        return JsonResponse({"id": post.id}, status=200)

    if request.method == "DELETE":
        post = get_object_or_404(Post, id=post_id)
        post.delete()
        return JsonResponse({"id": post.id}, status=204)

    return JsonResponse({"error": "Method Not Allowed"}, status=405)


# TODO 1: ブログの投稿を投稿日時順に並び替えて取得
# TODO 2: 正しくないリクエストの場合にはエラーメッセージを返す
# TODO 3: Commentのmodelを実装し、CommentのView実装
