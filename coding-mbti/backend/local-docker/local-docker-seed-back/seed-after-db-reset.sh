#bin/bash

echo "[Sanity Check]Checks if docker, docker-compose, docker-machine is properly installed."

if [ -x "$(command -v docker)" ]; then
    echo "[(1/2) docker is installed.]"
else
    echo "[(1/2) docker is not installed. please install.]"
    echo "aborting..."
    exit 1
fi

if [ -x "$(command -v docker-compose)" ]; then
    echo "[(2/2) docker-compose is installed.]"
else
    echo "[(2/2) docker-compose is not installed. please install.]"
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




DJANGOcontainerId=`docker ps | grep django-backend-server | awk '{print $1}'`

echo "Container[ID=$DJANGOcontainerId] is the django-backend-server. Checking installation completed..."

DIR=$(dirname "$0")
cd "$DIR"/../../

currentInstallation=`docker exec "$DJANGOcontainerId" pip list | grep -v "pip" | grep -v "setuptools" | grep -v "wheel" |awk 'NR>2{print $1}' | sort`
currentCNT=`echo "$currentInstallation" |wc -l`
havetoInstallation=`cat requirements.txt|grep -v "==\"Darwin\"" | awk '{print $1}' | sed 's/;.*//g' | sed 's/==*[0-9].*[0-9]//g' | sort`
havetoCNT=`echo "$havetoInstallation"   |wc -l`

until test "$currentCNT" -ge "$havetoCNT"; do
    printf "%d out of %d installed.\n" "$currentCNT" "$havetoCNT"
    currentInstallation=`docker exec "$DJANGOcontainerId" pip list | grep -v "pip" | grep -v "setuptools" | grep -v "wheel" |awk 'NR>2{print $1}' | sort`
    currentCNT=`echo "$currentInstallation" |wc -l`
    echo "not every requirements are installed yet..."
    echo "wait 10 secs..."
    sleep 10
done

test "$currentCNT" -ge "$havetoCNT" && echo "[installation check completed.]"




DBcontainerId=`docker ps | grep postgres | awk '{print $1}'`
echo "Container[ID=$DBcontainerId] is the postgres."

echo "deleting all tables to reset DB in postgres container[ID=$DBcontainerId]."
docker exec -it "$DBcontainerId" /bin/bash -c 'su -c "psql -d postgres -c \"DROP SCHEMA public CASCADE;CREATE SCHEMA public;GRANT ALL ON SCHEMA public TO postgres;GRANT ALL ON SCHEMA public TO public; \"" postgres'
echo "deletion completed."




echo "making migrations in django-backend-server container[ID=$DJANGOcontainerId]."
docker exec -it "$DJANGOcontainerId" /bin/bash -c 'cd /deploy/swpp2020-team16/coding-mbti/backend; python manage.py makemigrations'
echo "`python manage.py makemigrations` completed."




echo "migrate in django-backend-server container[ID=$DJANGOcontainerId]."
docker exec -it "$DJANGOcontainerId" /bin/bash -c 'cd /deploy/swpp2020-team16/coding-mbti/backend; python manage.py migrate'
echo "`python manage.py migrate` completed."




echo "seed in django-backend-server container[ID=$DJANGOcontainerId]."
docker exec -it "$DJANGOcontainerId" /bin/bash -c 'cd /deploy/swpp2020-team16/coding-mbti/backend; python manage.py seed'
echo "`python manage.py seed` completed."




