# Generated by Django 4.1.7 on 2023-03-20 11:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0003_userinfo_userid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userinfo',
            name='username',
            field=models.CharField(max_length=255),
        ),
    ]
