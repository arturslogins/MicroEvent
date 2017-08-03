'use strict'

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
const defaultPipe = require('../helpers/defaultPipe')
const mongodb = require('../../utilities/mongodb')
const rabbitmq = require('../../utilities/rabbitmq')
const Pipeline = require('pipes-and-filters')

/*
 * Get stuff from our backend business microservice
 */
const getStuff = (req, res) => {
  const pipeline = defaultPipe.getPipelineInstance(logicToGetStuff, (err, result) => {
    // This is executed at the end of the pipeline
    // Implementing asynchronous behaviour over REST: http://restcookbook.com/Resources/asynchroneous-operations/
    if (err) {
      res.status(500).end()
      return;
    }

    res.set('Location', req.path + '/' + result.requestId)
    res.status(202).end()
  })
  pipeline.execute(req)
}

const logicToGetStuff = (input, next) => {
  //publish the event that someone is interested in the stuff
  rabbitmq.publishToStuffExchange('contentOfTheMessageIsNotUsedForNow', input.requestId)

  //Return endpoint to call to get final result
  let error = null
  console.log('Logic to get stuff done.')
  let output = {
    requestId: input.requestId
  }
  next(error, output)
}

/*
 * Get async result
 */
const getStuffById = (req, res) => {
  const pipeline = defaultPipe.getPipelineInstance(tryRetrieveResult, (err, result) => {
    if (err) {
      res.status(500).end()
      return;
    }

    if (result) {
      res.json(result)
    } else {
      //Try again later
      res.set('Location', req.path)
      res.status(202).end()
    }
  })
  pipeline.execute(req)  
}

const tryRetrieveResult = (input, next) => {
  let error = null
  //get and validate input
  var userProvidedGUID = input.swagger.params.stuffId.value
  if (/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4{1}[a-fA-F0-9]{3}-[89abAB]{1}[a-fA-F0-9]{3}-[a-fA-F0-9]{12}$/.test(userProvidedGUID)) {
    //Try get response from MongoDB
    mongodb.tryGetWorkDone(userProvidedGUID).then(replies => {
      if (!replies || replies.length == 0) {
        console.log('Nothing found with that specific requestId... yet.')
        next(null, null)
      } else {
        const output = replies[0].value
        next(null, output)
      }
    }).catch(err => {
      console.error(err)
      next(new Error('Internal Server Error.'), Pipeline.break)
    })    
  } else {
    console.error('Illegal request. Expected GUID.')
    next(new Error('Illegal request.'), Pipeline.break)
  }
  
}

module.exports = {
  getStuff,
  getStuffById
}
