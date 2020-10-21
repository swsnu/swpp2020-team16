aws s3 cp s3://aws-codedeploy-us-east-1/latest/install /home/ec2-user/ --region us-east-1
sudo yum install ruby
sudo chmod +x /home/ec2-user/install
sudo /home/ec2-user/install auto
sudo service codedeploy-agent start
sudo service codedeploy-agent status
