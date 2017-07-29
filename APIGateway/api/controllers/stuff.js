'use strict'

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
const defaultPipe = require('../helpers/defaultPipe')

/*
 * Get stuff from our backend business microservice
 */
const getStuff = (req, res) => {
  const pipeline = defaultPipe.getPipelineInstance(logicToGetStuff, (result) => {
    // This is executed at the end of the pipeline
    res.json(result)
  })
  pipeline.execute(req)

}

const logicToGetStuff = (input, next) => {
  //Send message on RabbitMQ
  //Return endpoint to call to get final result

  let error = null
  console.log('Logic to get stuff done.')
  let output = 'done!'
  next(error, output)
}

module.exports = {
  getStuff
}
