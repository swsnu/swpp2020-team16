#!/bin/bash
  
cd /deploy/swpp2020-team16/coding-mbti/backend
pip install -r requirements.txt
./wait-for-it.sh db:5432 -t 10 python manage.py runserver 0.0.0.0:8000
