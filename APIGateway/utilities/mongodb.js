'use strict'

const config = require('config')
const dbConfig = config.get('apigateway.mongodb')
const MongoClient = require('mongodb').MongoClient
const Q = require('q')

let currentDBConnection = null
let workDoneCollection = null

const openConnection = () => {
  // connect to MongoDB
  // Use connect method to connect to the server
  const d = Q.defer()
  MongoClient.connect(dbConfig.connectionString, function(err, db) {
    if (!err) {
      currentDBConnection = db
      workDoneCollection = currentDBConnection.collection('workDone')
      workDoneCollection.createIndex('createdAt', { expireAfterSeconds: 10 } )
      console.log('Connected to MongoDB at ' + dbConfig.connectionString)
      d.resolve()
    } else {
      console.error('Failed connection to MongoDB at ' + dbConfig.connectionString)
      console.error(err)
      d.reject(err)
    }
  })
  return d.promise
}

const tryGetWorkDone = function(requestId) {
  if (!currentDBConnection) {
    throw new Error('Illegal state. Open a connection to the database by invoking openConnection before invoking tryGetWorkDone.')
  }

  // Get the documents collection
  const d = Q.defer()

  // Find some documents
  workDoneCollection.find({key: requestId}).toArray(function(err, docs) {
    if (err) {
      d.reject(err)
    } else {
      d.resolve(docs)
      if (docs && docs.length > 0) {
        workDoneCollection.deleteOne({key: requestId})
      }
    }
  })

  return d.promise
}


const storeWorkDone = (key, value) => {
  const d = Q.defer()
  workDoneCollection.insert({key, value, createdAt: new Date()}, function(err, result){
    if (err) {
      console.error('Failed connection to MongoDB at ' + dbConfig.connectionString)
      console.error(err)
      d.reject(err)
    } else {
      d.resolve(result.result)
    }
  })
  return d.promise
}

const closeConnection = () => {
  if (currentDBConnection) {
    currentDBConnection.close()
    currentDBConnection = null
    workDoneCollection = null
  }
}

module.exports = {
  openConnection,
  tryGetWorkDone,
  storeWorkDone,
  closeConnection
}