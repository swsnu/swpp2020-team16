./load.sh

if docker images -a | grep -Fq "django-backend-server"; then
    echo "[Image creation passed] : Image with 'django-backend-server' already exists."
else
    echo "[Image creation started] : creating docker image ..."
    docker build -t django-backend-server ./utils
    echo "[Image creation ended]"
fi

if docker ps -a | grep -Fq "local-docker-starter_django-backend-server_1"; then
    echo "[Container creation passed] : Container with name 'local-docker-starter_backend-server_1' already exists."
else
    echo "[Container creation started] : creating docker container ..."
    docker-compose -f docker-compose.local.yml up -d
    echo "[Container creation ended]"
fi

./unload.sh
