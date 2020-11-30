#!/bin/bash

CURRENT_EC2_INSTANCE_ID=$(ec2metadata --instance-id)
DEV_EC2_INSTANCE_ID="i-02507b371f1a6ca12"
PRD_EC2_INSTANCE_ID="i-0c21396ac5ea6c3b2"

# git clone
if [ "$CURRENT_EC2_INSTANCE_ID" == "$DEV_EC2_INSTANCE_ID" ]; then
    git clone -b dev https://github.com/swsnu/swpp2020-team16.git /home/ec2-user/swpp2020-team16
elif [ "$CURRENT_EC2_INSTANCE_ID" == "$PRD_EC2_INSTANCE_ID" ]; then
    git clone -b master https://github.com/swsnu/swpp2020-team16.git /home/ec2-user/swpp2020-team16
else
    echo "You've come to unreachable code. exiting..."
    exit 1
fi

# copy frontend docker scripts, env-cmdrc.js, package.json
cp -r /home/ec2-user/swpp2020-team16/etc/docker-scripts/frontend/* /home/ec2-user/docer-image/
sudo chmod +x /home/ec2-user/docer-image/deploy.sh
sudo chmod +x /home/ec2-user/docer-image/start-server.sh
cp /home/ec2-user/swpp2020-team16/coding-mbti/.env-cmdrc.js /home/ec2-user/deploy/swpp2020-team16/coding-mbti
cp /home/ec2-user/swpp2020-team16/coding-mbti/package.json /home/ec2-user/deploy/swpp2020-team16/coding-mbti

# clear git clone
rm -rf /home/ec2-user/swpp2020-team16

# check necessary installations
if sudo yum list | grep -q cloud-utils; then
    echo "cloud-utils exists."
    echo "ec2metadata command can be executed."
else
    echo "cloud-utils does not exist."
    echo "ec2metadata command can not executed."
    echo "installing cloud-utils..."
    sudo yum install cloud-utils
    echo "installation completed."
fi

# check necessary installations
if [ "$CURRENT_EC2_INSTANCE_ID" == "$DEV_EC2_INSTANCE_ID" ]; then
    echo "yarn run:built:dev" >> /home/ec2-user/docer-image/start-server.sh
elif [ "$CURRENT_EC2_INSTANCE_ID" == "$PRD_EC2_INSTANCE_ID" ]; then
    echo "yarn run:built:prd" >> /home/ec2-user/docer-image/start-server.sh
else
    echo "You've come to unreachable code. exiting..."
    exit 1
fi

# ready to replace build folder
if [ -d /home/ec2-user/deploy/swpp2020-team16/coding-mbti/build ]; then
  sudo rm -rf /home/ec2-user/deploy/swpp2020-team16/coding-mbti/build 
fi
sudo mkdir /home/ec2-user/deploy/swpp2020-team16/coding-mbti/build
