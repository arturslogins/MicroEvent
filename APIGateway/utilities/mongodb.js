'use strict';

const config = require('config')
const dbConfig = config.get('apigateway.mongodb')
const MongoClient = require('mongodb').MongoClient
let currentDBConnection = null

const openConnection = (callback) => {
  // connect to MongoDB
  // Use connect method to connect to the server
  MongoClient.connect(dbConfig.connectionString, function(err, db) {
    if (!err) {
      currentDBConnection = db
      console.log('Connected to ' + dbConfig.connectionString)
    } else {
      console.error('Failed connection to ' + dbConfig.connectionString)
      console.error(err)
    }
    callback(err)
  });
}

const closeConnection = () => {
  if (currentDBConnection) {
    currentDBConnection.close()
    currentDBConnection = null
  }
}

module.exports = {
  openConnection,
  closeConnection
}