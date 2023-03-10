#!/bin/bash

python manage.py migrate

# Djangoのsuperuserが存在しない場合に、新しいsuperuserを作成する
python manage.py shell <<EOF
from django.contrib.auth.models import User

if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'password')
EOF

python manage.py runserver 0.0.0.0:3130