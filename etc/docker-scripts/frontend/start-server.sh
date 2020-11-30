#!/bin/bash
  
cd /deploy/swpp2020-team16/coding-mbti
yarn install
yarn global add serve


#AWS Specific code
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

CURRENT_EC2_INSTANCE_ID=$(ec2metadata --instance-id)
DEV_EC2_INSTANCE_ID="i-02507b371f1a6ca12"
PRD_EC2_INSTANCE_ID="i-0c21396ac5ea6c3b2"

if [ "$CURRENT_EC2_INSTANCE_ID" == "$DEV_EC2_INSTANCE_ID" ]; then
    yarn run:built:dev
elif [ "$CURRENT_EC2_INSTANCE_ID" == "$PRD_EC2_INSTANCE_ID" ]; then
    yarn run:built:prd
else
    echo "You've come to unreachable code."
    echo "exiting..."
    exit 1
fi


