'use strict'

const mongodb = require('../../utilities/mongodb')
const rabbitmq = require('../../utilities/rabbitmq')
const genericUtils = require('../../utilities/generic')
const asyncHelpers = require('../helpers/async')
const Pipeline = require('pipes-and-filters')

const baseData = {
  overallErrors: {
    data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
    labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
  },
  governmentStats: {
    data: [1, 18, 9, 17, 34, 22, 11],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  },
  nationalNewsStats: {
    data: [78, 81, 80, 45, 34, 12, 40],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  },
  taxSystemStats: {
    data: [65, 59, 84, 84, 51, 55, 40],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  }
}

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
  var userProvidedUUID = input.swagger.params.userbehaviourId.value
  if (genericUtils.isCorrectUUID(userProvidedUUID)) {

    /////////////////////////////////////////
    // TODO: Try get response from MongoDB //
    /////////////////////////////////////////

    // Hardcoded values
    next(null, baseData)
    updateBaseData()

  } else {
    console.error('Illegal request. Expected GUID.')
    next(new Error('Illegal request.'), Pipeline.break)
  }
  
}

const updateBaseData = () => {
  Object.keys(baseData).forEach(value => {
    let dataArray = baseData[value].data
    dataArray.push(Math.floor(Math.random() * 100) + 1)
    dataArray.shift()
  })
}

module.exports = {
  getUserBehaviourStatistics,
  getUserBehaviourStatisticsById
}
