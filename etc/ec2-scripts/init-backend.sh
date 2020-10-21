#!/bin/bash


echo "allow execute mode ..."

sudo chmod +x ./install-aws-cli.sh
sudo chmod +x ./install-aws-codedeploy.sh
sudo chmod +x ./install-docker.sh
sudo chmod +x ./install-nginx.sh

echo "install aws-cli, aws-codedeploy, docker, nginx .."

./install-aws-cli.sh
./install-aws-codedeploy.sh
./install-docker.sh
./install-nginx.sh


echo "initialize nginx"

sudo cp ../nginx-scripts/nginx.conf /etc/nginx/nginx.conf
sudo mkdir /etc/nginx/sites-available
sudo mkdir /etc/nginx/sites-enabled
sudo cp ../nginx-scripts/backend/swpp2020-team16-backend.conf /etc/nginx/sites-available/swpp2020-team16-backend.conf
sudo ln -fs /etc/nginx/sites-available/swpp2020-team16-backend.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl start nginx
sudo systemctl status nginx

echo "create deploy dir"

sudo mkdir /home/ec2-user/deploy
sudo mkdir /home/ec2-user/deploy/swpp2020-team16
sudo mkdir /home/ec2-user/deploy/swpp2020-team16/coding-mbti
sudo mkdir /home/ec2-user/deploy/swpp2020-team16/coding-mbti/backend

echo "create docker-image dir"

sudo mkdir /home/ec2-user/docker-image
sudo cp -r ../docker-scripts/backend/* /home/ec2-user/docker-image
sudo chmod +x /home/ec2-user/docker-image/start-server.sh
sudo chmod +x /home/ec2-user/docker-image/deploy.sh
sudo chmod +x /home/ec2-user/docker-image/init-backend.sh

echo "please connect again after exit"
echo "  docker build -t django-backend-server ."
echo "  ./deploy"




