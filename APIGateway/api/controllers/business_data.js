'use strict'

const mongodb = require('../../utilities/mongodb')
const rabbitmq = require('../../utilities/rabbitmq')
const asyncHelpers = require('../helpers/async')

/*
 * Get business data from our backend business microservice
 */
const getUserBehaviourStatistics = (req, res) => {
  asyncHelpers.serveOriginalRequest(req, res, logicToGetUserBehaviourStatistics)
}

const logicToGetUserBehaviourStatistics = (input, next) => {

  /////////////////////////////////////////////////////////////////////////////
  // TODO: publish the event that someone is interested in the business data //
  /////////////////////////////////////////////////////////////////////////////

  next(null, input)
}

/*
 * Get async result
 */
const getUserBehaviourStatisticsById = (req, res) => {
  asyncHelpers.serveFinalRequest(req, res, tryRetrieveResult)
}

const tryRetrieveResult = (input, next) => {
  let error = null
  //get and validate input
  var userProvidedGUID = input.swagger.params.userbehaviourId.value
  if (/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4{1}[a-fA-F0-9]{3}-[89abAB]{1}[a-fA-F0-9]{3}-[a-fA-F0-9]{12}$/.test(userProvidedGUID)) {

    /////////////////////////////////////////
    // TODO: Try get response from MongoDB //
    /////////////////////////////////////////

    next(null, {
      overallErrors: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98] // Hardcoded values
    })

  } else {
    console.error('Illegal request. Expected GUID.')
    next(new Error('Illegal request.'), Pipeline.break)
  }
  
}

module.exports = {
  getUserBehaviourStatistics,
  getUserBehaviourStatisticsById
}
