#!/bin/bash
  
cd /deploy/swpp2020-team16/coding-mbti
yarn
yarn global add serve

# `yarn run:built:dev` or `yarn run:built:prd` will be added dynamically based on ec2 instance id
# handled in swpp2020-team16/aws-codedeploy-scripts/frontend/execute-before-install.sh
