'use strict'

const Pipeline = require('pipes-and-filters')

const logRequestToAudit = (input, next) => {
  let error = null
  console.log('Log request to audit done')
  next(error, input)
}

const authenticateCall = (input, next) => {
  let error = null
  if (error) {
    console.log('Authentication error. Aborting...')
    next(null, Pipeline.break)
  } else {
    let output = null
    console.log('Authenticate call done')
    next(error, output)
  }
}

const authorizeCall = (input, next) => {
  let error = null
  if (error) {
    console.log('Authorization error. Aborting...')
    next(null, Pipeline.break)
  } else {
    let output = null
    console.log('Authorize call done')
    next(error, output)
  }
}

const logResponseToAudit = (input, next) => {
  let error = null
  console.log('Log response to audit call done')
  next(error, input)
}

const getPipelineInstance = (businessLogic, doneCallBack) => {
  if (!businessLogic || typeof businessLogic !== 'function') {
    throw new Error('Illegal argument: businessLogic')
  }
  const pipeline = Pipeline.create('Default Pipeline')
  pipeline.use(logRequestToAudit)
  pipeline.use(authenticateCall)
  pipeline.use(authorizeCall)
  pipeline.use(businessLogic)
  pipeline.use(logResponseToAudit)
  pipeline.once('error', (err) => {
    console.error(err)
    throw new Error('Internal Server Error')
  })
  pipeline.once('end', function(result) {
    if (result === Pipeline.break) {
      throw new Error('Internal Server Error')
    } else {
      doneCallBack(result)
    }
  });  
  return pipeline
}

module.exports = {
  getPipelineInstance
}
