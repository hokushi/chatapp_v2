# Generated by Django 4.1.7 on 2023-03-20 06:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_userinfo_alter_message_sender_alter_room_members'),
    ]

    operations = [
        migrations.AddField(
            model_name='userinfo',
            name='userid',
            field=models.CharField(default='0', max_length=255, unique=True),
            preserve_default=False,
        ),
    ]
