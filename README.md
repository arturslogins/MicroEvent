# MicroEvent
Microservices - Code event

* [Prerequisites](#prerequisites)
* [Running Tests](#running-tests)
* [Usage](#how-to-use-it)
* [API Reference](#api-reference)
* [Resources](#resources)

## Prerequisites
* Install [Virtual Box](https://www.virtualbox.org/wiki/Downloads)
* Install [Vagrant](https://www.vagrantup.com/downloads.html)
* Install [swagger-node]()
    * npm install -g swagger 

## Tools
https://www.draw.io/



MonitorMS ----> Central Server for update status
TestMS -------> Central Server to get tests for this specific group
TestMS -------> Central Server to publish test results
LogMS  -------> Central Server to collect logging per group
ChatMS -------> Central Server to publish chat messages and get current status of the chat room