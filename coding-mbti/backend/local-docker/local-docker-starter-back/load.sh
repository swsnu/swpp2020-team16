mkdir utils
cp ../../../../etc/docker-scripts/backend/Dockerfile ./utils
cp ../../../../etc/docker-scripts/backend/start-server.sh ./utils
#cp ../../../etc/docker-scripts/backend/init-backend.sh ./utils
cp ../../../../etc/docker-scripts/backend/wait-for-it.sh ./utils

chmod +x ./utils/start-server.sh
#chmod +x ./utils/init-backend.sh
chmod +x ./utils/wait-for-it.sh
