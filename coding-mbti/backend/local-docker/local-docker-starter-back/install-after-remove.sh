./load.sh

echo "[Container Removal Started] : Removing all docker containers ..."
docker rm -vf $(docker ps -a -q)
echo "[Container Removal Ended]"
echo "[Volume Removal Started] : Removing all docker volumes ..."
docker volume rm $(docker volume ls -q)
echo "[Volume Removal Ended]"
echo "[Image Removal Started] : Removing all docker images ..."
docker rmi -f $(docker images -a -q)
echo "[Image Removal Ended]"
echo "[build dockerfile...]"
docker build -t django-backend-server ./utils
echo "[compose images...]"
docker-compose -f docker-compose.local.yml up -d

./unload.sh
