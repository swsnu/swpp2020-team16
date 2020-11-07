echo "[Sanity Check]Checks if docker-machine is properly installed."

if [ -x "$(command -v docker-machine)" ]; then
    echo "[(3/3) docker-compose is installed.]"
else
    echo "[(3/3) docker-compose is not installed. please install.]"
    echo "aborting..."
    exit 1
fi

if echo "$1" | grep -Fq "1"; then
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
    docker-machine ip default | awk '{print "please connect to http://"$1":8000 or http://0.0.0.0:8000"}'
    echo ""
else
    echo "please refer to the error log."
fi
