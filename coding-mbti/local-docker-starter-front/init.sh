#!/bin/bash
#set -e 

echo "local docker machine installation starts."
echo "..."
echo "..."

echo "[ REMINDER ]"
echo "    If you already have other installed images or containers, press n or N."
echo "    If you are new and want to keep your local machine always clean, press y or Y."

echo -n "Is it okay to remove all your images and containers before installing starts (y/n)?   "

read answer

echo "Checks if docker, docker-compose, docker-machine is properly installed."

if [ -x "$(command -v docker)" ]; then
    echo "[(1/3) docker is installed.]"
else
    echo "[(1/3) docker is not installed. please install.]"
    echo "aborting..."
    exit 1
fi

if [ -x "$(command -v docker-compose)" ]; then
    echo "[(2/3) docker-compose is installed.]"
else
    echo "[(2/3) docker-compose is not installed. please install.]"
    echo "aborting..."
    exit 1
fi

if [ -x "$(command -v docker-machine)" ]; then
    echo "[(3/3) docker-compose is installed.]"
else
    echo "[(3/3) docker-compose is not installed. please install.]"
    echo "aborting..."
    exit 1
fi


echo "Checks if docker is running..."
if docker info | grep -Fq "Cannot connect to the Docker daemon"; then
    echo "Docker is not running. please run it before you start this script."
    echo "aborting..."
    exit 1
else
    echo "[Docker is running.]"
fi

./load.sh

correctlyDone=0

if [ "$answer" != "${answer#[Yy]}" ] ;then
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
    docker build -t node-frontend-server ./utils
    echo "[compose images...]"
    docker-compose -f docker-compose.local.yml up
    correctlyDone=1

elif [ "$answer" != "${answer#[Nn]}" ] ;then
    if docker images -a | grep -Fq "node-frontend-server"; then
        echo "[Image creation passed] : Image with 'node-frontend-server' already exists."
    else
        echo "[Image creation started] : creating docker image ..."
        docker build -t node-frontend-server ./utils
        echo "[Image creation ended]"
    fi

    if docker ps -a | grep -Fq "local-docker-starter-front_node-frontend-server_1"; then
        echo "[Container creation passed] : Container with name 'local-docker-starter-front_node-frontend-server_1' already exists."
    else
        echo "[Container creation started] : creating docker container ..."
        docker-compose -f docker-compose.local.yml up -d
        echo "[Container creation ended]"
    fi
    correctlyDone=1
    
else
    echo "Please press Y,y,N,n only."
fi

./unload.sh

if echo "$correctlyDone" | grep -Fq "1"; then
    echo ""
    echo "#############################################################"
    echo "####                                                     ####"
    echo "####     every installation work is done correctly!      ####"
    echo "####                                                     ####"
    echo "#############################################################"
    echo ""
    echo "It might take 2~4 more seconds to successfully access to URL."
    echo "Please be patient."
    echo ""
    docker-machine ip default | awk '{print "please connect to http://"$1"/3000"}'
    echo ""
else
    echo "please refer to the error log."
fi
