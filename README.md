# MicroEvent

## A set of distributed challenges

* [Introduction](#introduction)
* [High Level Overview](#high-level-overview)
* [Prerequisites](#prerequisites)
* [Getting Started](#getting-started)
* [Challenges](#challenges)
* [Tools and Libraries](#tools-and-libraries)

## Introduction

We live in a highly connected world.
More and more critical services are available through the internet and become essential parts of our life.
Many countries have now ratified the decision to create a shared group of highly skilled professional with the only goal of monitoring and keep these crucial systems online.

Congratulations, you have been selected among thousands to help us in this endeavour!

You will manage the ParsonsSys for your country!

## High Level Overview

![High Level Overview](./Docs/MicroEvent.png)

Above you can have a look at our high-level architectural drawing.
Each team will represent a country and will have to run the ParsonsSys on a local datacenter (your laptops).

It does not work out of the box, of course.
Your goal is to pass successfully a set of [challenges](#challenges) designed to help you in getting an overview of the system and, at the end, wire it correctly to the ParsonsNet.

For more information see our [Infrastructure Docs](./Docs/Infrastructure.md)

## Prerequisites

* Install [Git](https://git-scm.com/downloads)
* Install [Virtual Box](https://www.virtualbox.org/wiki/Downloads)
* Install [Vagrant](https://www.vagrantup.com/downloads.html)
* Install [swagger-node](https://github.com/swagger-api/swagger-node/blob/master/docs/install.md) globally

## Getting Started

If you are running Linux/Mac OS X you can just run `./start.sh`

If you are instead running Windows you can run `./start.sh` from Git Bash (usually located at `C:\Program Files\Git\git-bash.exe`)

## Challenges

### Challenge Zero: Hello Microservices World!

You need to change the message received from StuffMS. Just because you can! The obective of this challenge is to give you insight on how a full call works, end-to-end.

Trace the call from the frontend to backend and personalize the message from StuffMS:

![StuffMS Message](./Docs/ChallengeZero.png)

Please remember that this example is forcibly more complex in order to help you out in the following challenges. We have supposed that the state in TheDashboard and the state in StuffMS can influence each others. Of course this is not true in this case, but maybe after your changes it will be?

If you need a database, you have it :)
[MongoDB](https://github.com/DanskeBank/MicroEvent/blob/724edef9f3cbbe2cfa9bd654f219c73d611dcddb/APIGateway/utilities/mongodb.js)

Do you need [some help](./Docs/Hints/ChallengeZero.md)?

### First Challenge: "Real" data

Right now the data showed on the main page are somewhat fake. The top most controllers updates continuosly with new data, but that data is generated on the API Gateway.
We have done that in order to help you out with the APIs definition, but this is [an Anti-pattern](https://martinfowler.com/articles/microservices.html#SmartEndpointsAndDumbPipes) and needs to be changed.

![StuffMS Message](./Docs/ChallengeOne1.png)

Moreover, the rest of the page is completely static.

![StuffMS Message](./Docs/ChallengeOne2.png)
![StuffMS Message](./Docs/ChallengeOne3.png)

In order to complete this challenge you should:

1. Agree on which kind of information all graphs should show. You could also simplify or [enrich](https://github.com/mrholek/CoreUI-Vue) the dashboard if you think there are too many or too few controls.
1. Based on the previous excercise, you should define the architecture that will deliver the data to the frontend. As already said, [it is an Anti-pattern to keep complex business logic on the API Gateway](https://martinfowler.com/articles/microservices.html#SmartEndpointsAndDumbPipes) so you will need at least another microservice (maybe more). Moreover, having data in memory is [not reccommended](http://www.vinaysahni.com/best-practices-for-building-a-microservice-architecture#stateless) (it will hit you when trying to scale). Keep the data in a database, and keep the database [private to the instances of that specific microservice](https://www.nginx.com/blog/microservices-at-netflix-architectural-best-practices/).
1. Based on the two excercises above, you need to determine whether the state of TheDashboard and the state of this (these) new microservice(s) can influence each others. If this is true, you may want to use the same approach we used for [StuffMS](./Docs/Hints/ChallengeZero.md). If instead the data are just pushed everytime they change from the business layer (the new microservices) out to the frontend web application, then *you may want to use a simpler approach*.

Do you need [some help](./Docs/Hints/ChallengeOne.md)?

### Second Challenge: Logs

A best practice when developing microservice architecture it to have [centralized logging](http://www.vinaysahni.com/best-practices-for-building-a-microservice-architecture#logging)

### Third Challenge: Monitoring

[Centralized monitoring](http://www.vinaysahni.com/best-practices-for-building-a-microservice-architecture#monitoring) is also among best practices for this architecture.

### Third Challenge: On your own with OpsChat

### Extra credits: Secure the system

There are quite some security issues in the current implementation. Why don't you try to list some of them and propose a possible solution?

Even better, why don't you try to implement the solutions? :)

## Tools and Libraries

[draw.io](https://www.draw.io/)