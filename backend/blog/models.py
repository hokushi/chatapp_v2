from django.db import models


class User(models.Model):
    name = models.CharField(max_length=20)
    email = models.EmailField()
    password = models.CharField(max_length=20)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "ユーザー"
        verbose_name_plural = "ユーザー"


class Tag(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "タグ"
        verbose_name_plural = "タグ"


# Blog記事のこと (POST メソッドのPOSTとは違う。confusingでごめんなさい)
class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    tags = models.ManyToManyField(Tag, related_name="posts")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "投稿"
        verbose_name_plural = "投稿"


# TODO: Commentモデル実装
