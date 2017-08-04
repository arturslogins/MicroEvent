echo 'deb http://www.rabbitmq.com/debian/ testing main' | sudo tee /etc/apt/sources.list.d/rabbitmq.list
echo "deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
wget -O- https://www.rabbitmq.com/rabbitmq-release-signing-key.asc | sudo apt-key add -
sudo apt-get update
sudo DEBIAN_FRONTEND=noninteractive apt-get -y install rabbitmq-server --force-yes
rabbitmq-plugins enable rabbitmq_management
echo '[{rabbit, [{loopback_users, []}]}].' | sudo tee /etc/rabbitmq/rabbitmq.config
service rabbitmq-server restart
sudo apt-get install -y mongodb-org --force-yes
mv /etc/mongod.conf /etc/mongod.old.conf
head -n -18 /etc/mongod.old.conf | sudo tee /etc/mongod.conf
service mongod restart
