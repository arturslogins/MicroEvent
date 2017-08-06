'use strict'

const mongodb = require('../../utilities/mongodb')
const rabbitmq = require('../../utilities/rabbitmq')
const genericUtils = require('../../utilities/generic')
const asyncHelpers = require('../helpers/async')
const Pipeline = require('pipes-and-filters')

const baseData = {
  logs: [
    {
      id: '1',
      logLevel: 'Debug',
      timestamp: '2017-08-11T12:11:10Z',
      location: 'SuperMarioMS',
      contents: "Something is going as it should!"
    },
    {
      id: '2',
      logLevel: 'Info',
      timestamp: '2017-08-11T12:11:10Z',
      location: 'LuigiMS',
      contents: "Something is happening, but all is well!"
    },
    {
      id: '3',
      logLevel: 'Warning',
      timestamp: '2017-08-11T12:11:10Z',
      location: 'BimSalaBimMS',
      contents: "Ehi that's not cool..."
    },
    {
      id: '4',
      logLevel: 'Error',
      timestamp: '2017-08-11T12:11:10Z',
      location: 'CrashMS',
      contents: "BOOM!"
    }
  ]
}

/*
 * Get logs data from our backend logging microservice
 */
const getLogsByPage = (req, res) => {
  asyncHelpers.serveOriginalRequest(req, res, logicToGetLogs)
}

const logicToGetLogs = (input, next) => {

  //////////////////////////////////////////////////////////////////////////////////
  // TODO: publish the event that someone is interested in that specific log page //
  //////////////////////////////////////////////////////////////////////////////////

  next(null, input)
}

/*
 * Get async result
 */
const getLogsPageById = (req, res) => {
  asyncHelpers.serveFinalRequest(req, res, tryRetrieveResult)
}

const tryRetrieveResult = (input, next) => {
  let error = null
  //get and validate input
  var userProvidedUUID = input.swagger.params.logRequestId.value
  if (genericUtils.isCorrectUUID(userProvidedUUID)) {

    /////////////////////////////////////////
    // TODO: Try get response from MongoDB //
    /////////////////////////////////////////

    // Hardcoded values
    next(null, baseData)

  } else {
    console.error('Illegal request. Expected GUID.')
    next(new Error('Illegal request.'), Pipeline.break)
  }
  
}

module.exports = {
  getLogsByPage,
  getLogsPageById
}
