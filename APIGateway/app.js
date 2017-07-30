'use strict';

const mongodb = require('./utilities/mongodb')
const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
const port = process.env.PORT || 10010;
const config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  mongodb.openConnection(err => {
    if (!err) {
      app.listen(port);
    } else {
      console.error(err)
    }
  }) 
});

module.exports = app; // for testing
