const should = require('should')
const request = require('supertest')
const server = require('../../../app')

describe('controllers', function() {

  describe('stuff', function() {

    describe('GET /stuff', function() {

      it('should return a HTTP 202 empty answer with the correct headers', function(done) {

        request(server)
          .get('/stuff')
          .set('Accept', 'application/json')
          .expect('Location', /^\/stuff\/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4{1}[a-fA-F0-9]{3}-[89abAB]{1}[a-fA-F0-9]{3}-[a-fA-F0-9]{12}$/)
          .expect(202)
          .end(function(err, res) {
            should.not.exist(err)
            res.body.should.eql({})
            done()
          })
      })

    })

    describe('GET /stuff/{requestId}', function() {

      it('should return a HTTP 500 since it is not a valid UUID', function(done) {

        request(server)
          .get('/stuff/notexistentid')
          .set('Accept', 'application/json')
          .expect(500)
          .end(function(err, res) {
            res.body.should.eql({})
            done()
          })
      })

    })

  })

})
