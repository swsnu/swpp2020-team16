docker rm -f $(docker ps -a -q)
docker rmi -f $(docker images -a)
docker build -t django-backend-server .
./deploy.sh