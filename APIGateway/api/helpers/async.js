'use strict'

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
const defaultPipe = require('../helpers/defaultPipe')
const Pipeline = require('pipes-and-filters')

/*
 * Get business data from our backend business microservice
 */
const serveOriginalRequest = (req, res, businessLogicFunction) => {
  const pipeline = defaultPipe.getPipelineInstance(businessLogicFunction, (err, result) => {
    // This is executed at the end of the pipeline
    // Implementing asynchronous behaviour over REST: http://restcookbook.com/Resources/asynchroneous-operations/
    if (err) {
      res.status(500).end()
      return;
    }

    res.set('Location', req.path + '/' + result.requestId)
    res.set('Access-Control-Expose-Headers', 'Location')
    res.status(202).end()
  })
  pipeline.execute(req)
}

/*
 * Get async result
 */
const serveFinalRequest = (req, res, businessLogicFunction) => {
  const pipeline = defaultPipe.getPipelineInstance(businessLogicFunction, (err, result) => {
    if (err) {
      res.status(500).end()
      return;
    }

    if (result) {
      res.json(result)
    } else {
      //Try again later
      res.set('Location', req.path)
      res.set('Access-Control-Expose-Headers', 'Location')
      res.status(202).end()
    }
  })
  pipeline.execute(req)  
}

module.exports = {
  serveOriginalRequest,
  serveFinalRequest
}
