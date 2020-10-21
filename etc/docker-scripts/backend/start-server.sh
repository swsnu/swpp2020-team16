#!/bin/bash
  
cd /deploy/swpp2020-team16/coding-mbti/backend

pip3 install pip==20.0.2
pip3 install django==3.1.1
pip3 install gunicorn==20.0.2
pip3 install psycopg2-binary==2.8.6

/init-backend.sh
/wait-for-it.sh db:5432 -t 10 -- python manage.py runserver 0.0.0.0:8000