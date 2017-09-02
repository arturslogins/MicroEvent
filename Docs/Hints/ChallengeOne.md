# Hints for First Challenge

## Keep it simple

As already stated in the challenge description, if you build up a complex scenario, you may want to use the same approach we used for [StuffMS](./Docs/Hints/ChallengeZero.md)

In the following we analyse the simplest solution to the problem at hand. Usually this is the best approach to take at the beginning of any project. Start easy, get your solution to production as fast as possible, and keep a note of where there may be needed some improvement when more functionality needs to be added.

In a nutshell you can solve this issue by keeping an updated cache of the needed information in a database owned by the API Gateway. This is a simple solution but it risks to mess up the simplicity of the API Gateway if new features / business requirements come in later on.

## Changes in the API implementation

In this scenario we do not have any sort of requirement that may force the state of the backend microservice(s) to depend partially on the state of the frontend web application (TheDashboard).

We do not need to fetch new data on the fly from the backend microservice, because its state (and thus its output) is independent from any input that the frontend web application may provide.

This practically means that you can keep a cache of the data up to date as close as possible to the API Gateway in order to improve latency and reduce resource consumption.

We argue that for the time being we can keep the data in a collection on MongoDB which is owned by the API Gateway. We then [keep the api definition as it is](https://github.com/DanskeBank/MicroEvent/blob/e766ac0454841dde453f2b94f41647fbefcd4ec6/APIGateway/api/swagger/swagger.yaml#L78), and [modify the code](https://github.com/DanskeBank/MicroEvent/blob/e766ac0454841dde453f2b94f41647fbefcd4ec6/APIGateway/api/controllers/business_data.js#L35) in order to fetch the data from the new collection on MongoDB and return it directly, avoiding any asynchronous behaviour (remove that code and instead of a 202 returns the data with a status 200).

## Create the UserBehaviourMS

You need to create a new microservice (you can get inspired by StuffMS) that will be responsible to keep the data on UserBehavior (or whatever you have decided your graphs will show :wink: ).
This microservice generates or fetch from an external source some data. Whenever its state changes (new data is fetched / generated) it emits an event in order to notify the rest of the distributed system ([example](https://github.com/DanskeBank/MicroEvent/blob/e766ac0454841dde453f2b94f41647fbefcd4ec6/StuffMS/src/utilities/rabbitmq.js#L73)).
Remember to create a new exchange in order to ensure events do not get mixed up and that you can easily extend the system later on.

## Keep the collection up to date

The collection owned by the API Gateway needs to be kept up to date. In order to do so the API Gateway needs to subscribe to be notified whenever the state in UserBehaviourMS changes. An example on this may be done can be found [here](https://github.com/DanskeBank/MicroEvent/blob/e766ac0454841dde453f2b94f41647fbefcd4ec6/APIGateway/utilities/rabbitmq.js#L39).

## Things we need to keep in mind

Looking for extra challenges?
This is all nice and shiny now, however in a production system you need to think what happens when we break:

1. How to bootstrap the cache in the API Gateway. The collection is empty when created (or when flushed, or when an error occur). What happens at that point? The solution may even be: we do not care, we just show a flat line and start again from the first event received. However this needs to be an informed decision.
1. What happens when the data is too old?
1. What happens if there are inconsistency between the states of the API Gateway and the UserBehaviourMS?
1. What happens if messages are lost or duplicate messages are received?