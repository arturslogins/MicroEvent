'use strict'

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
const mongodb = require('../../utilities/mongodb')
const rabbitmq = require('../../utilities/rabbitmq')
const genericUtils = require('../../utilities/generic')
const asyncHelpers = require('../helpers/async')
const Pipeline = require('pipes-and-filters')

/*
 * Get stuff from our backend business microservice
 */
const getStuff = (req, res) => {
  asyncHelpers.serveOriginalRequest(req, res, logicToGetStuff)
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
  asyncHelpers.serveFinalRequest(req, res, tryRetrieveResult) 
}

const tryRetrieveResult = (input, next) => {
  let error = null
  //get and validate input
  var userProvidedUUID = input.swagger.params.stuffId.value
  if (genericUtils.isCorrectUUID(userProvidedUUID)) {
    //Try get response from MongoDB
    mongodb.tryGetWorkDone(userProvidedUUID).then(replies => {
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
