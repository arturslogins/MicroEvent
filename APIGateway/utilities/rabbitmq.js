const amqp = require('amqplib/callback_api')
const config = require('config')
const dbConfig = config.get('apigateway.rabbitmq')
const Q = require('q')
const mongodb = require('./mongodb')

const stuffExchangeName = 'stuffNeeded'
const workDoneExchangeName = 'workDone'
const workDoneSubscriptionQueueName = 'apigateway_workDone'

let currentRabbitMQConnection = null
let currentStuffRMQChannel = null

const openConnection = () => {
  const d = Q.defer()
  amqp.connect(dbConfig.connectionString, function(err, conn) {
    if (err) {
      console.error('Failed to connect to RabbitMQ at ' + dbConfig.connectionString)
      d.reject(err)
      return
    }

    currentRabbitMQConnection = conn

    currentRabbitMQConnection.createChannel(function(err, ch) {
      if (err) {
        console.error('Failed to create exchange ' + stuffExchangeName + ' on RabbitMQ at ' + dbConfig.connectionString)
        currentRabbitMQConnection.close()
        d.reject(err)
        return
      }
      console.log('Connected to RabbitMQ at ' + dbConfig.connectionString)
      currentStuffRMQChannel = ch

      // Ensure the exchange to publish to is there, if not create it
      currentStuffRMQChannel.assertExchange(stuffExchangeName, 'fanout', {durable: true})
      console.log('The exchange "' + stuffExchangeName + '" has been created successfully.')

      // Ensure the exchange to subscribe to is there, if not create it
      currentStuffRMQChannel.assertExchange(workDoneExchangeName, 'fanout', {durable: true});
      console.log('The exchange "' + workDoneExchangeName + '" has been created successfully.')

      // Register callback to be invoked when new messages are received
      // All instances of the APIGateway (if needed you can scale it out) will share the same queue in order to compete for messages
      currentStuffRMQChannel.assertQueue(workDoneSubscriptionQueueName, {exclusive: false}, function(err, q) {
        if (err) {
          console.error('Failed to create subscription queue ' + workDoneSubscriptionQueueName + ' on RabbitMQ at ' + dbConfig.connectionString)
          currentRabbitMQConnection.close()
          d.reject(err)
          return
        }

        // Bind queue to exchange in order to receive a copy of the published messages
        currentStuffRMQChannel.bindQueue(q.queue, workDoneExchangeName, '');

        currentStuffRMQChannel.consume(q.queue, reactOnWorkDoneMessage, {noAck: false});
        console.log('Subscription queue "' + q.queue + '" has been created and binded successfully.')
        d.resolve()
      });

    })
  })
  return d.promise
}

// Invoked when a new message is received on the WorkDone Exchange
const reactOnWorkDoneMessage = (msg) => {
  mongodb.storeWorkDone(msg.properties.messageId, msg.content.toString()).then(() => {
    currentStuffRMQChannel.ack(msg)
  }).catch(err => {
    currentStuffRMQChannel.reject(msg, false); // TODO: requing in case of failure is deactivated. Dead lettering is not setup.
    console.error('WorkDone is lost. Error: ' + err)
  })
}

// Used in order to publish a new request for Stuff
const publishToStuffExchange = (msg, requestId) => {
  if (currentStuffRMQChannel) {
    currentStuffRMQChannel.publish(stuffExchangeName, '', new Buffer(msg), {
      messageId: requestId
    })
  } else {
    throw new Error('Illegal state. Open a connection to RabbitMQ by invoking openConnection before invoking publishToStuffExchange.')    
  }
}

const closeConnection = () => {
  if (currentRabbitMQConnection) {
    currentRabbitMQConnection.close()
    currentRabbitMQConnection = null
  }
}

module.exports = {
  openConnection,
  publishToStuffExchange,
  closeConnection
}