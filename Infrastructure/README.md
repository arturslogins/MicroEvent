# Infrastructure

RabbitMQ
MongoDB

If you have issue with proxies:

https://stackoverflow.com/questions/19872591/how-to-use-vagrant-in-a-proxy-environment
vagrant plugin install vagrant-proxyconf
config.proxy.http     = "http://yourproxy:8080"
config.proxy.https    = "http://yourproxy:8080"
config.proxy.no_proxy = "localhost,127.0.0.1"