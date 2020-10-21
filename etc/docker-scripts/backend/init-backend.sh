#install requirements
pip3 install -r requirements.txt

#makemigrations
python manage.py makemigrations

#migrate
python manage.py migrate