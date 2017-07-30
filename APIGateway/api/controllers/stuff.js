'use strict'

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
const Guid = require('guid')
const defaultPipe = require('../helpers/defaultPipe')

/*
 * Get stuff from our backend business microservice
 */
const getStuff = (req, res) => {
  const pipeline = defaultPipe.getPipelineInstance(logicToGetStuff, (result) => {
    // This is executed at the end of the pipeline
    // Implementing asynchronous behaviour over REST: http://restcookbook.com/Resources/asynchroneous-operations/
    res.set('Location', req.path + '/' + result.requestId)
    res.status(202).end()
  })
  pipeline.execute(req)
}

const logicToGetStuff = (input, next) => {
  //TODO: Send message on RabbitMQ

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
  const pipeline = defaultPipe.getPipelineInstance(tryRetrieveResult, (result) => {
    if (result) {
      res.json(result);
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
  userProvidedGUID = new Guid(userProvidedGUID)
  if(Guid.isGuid(userProvidedGUID)) {

    //Try get response from MongoDB
    const output = 'StuffFromMongo!'

    console.log('success!')
    next(null, output)

  } else {
    console.error('Illegal request. Expected GUID.')
    next(new Error('Illegal request.'), Pipeline.break)
  }
  
}

module.exports = {
  getStuff,
  getStuffById
}
