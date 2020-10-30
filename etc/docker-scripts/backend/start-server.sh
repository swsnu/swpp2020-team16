#!/bin/bash
set -e

#install requirements
pip install -r /deploy/swpp2020-team16/coding-mbti/backend/requirements.txt

#makemigrations
python /deploy/swpp2020-team16/coding-mbti/backend/manage.py makemigrations

#migrate
python /deploy/swpp2020-team16/coding-mbti/backend/manage.py migrate

/wait-for-it.sh db:5432 -t 10 -- echo "db is ready!" && python /deploy/swpp2020-team16/coding-mbti/backend/manage.py runserver 0.0.0.0:8000
