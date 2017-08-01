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
          .expect('Location', /\/stuff\/(?:.+\-.+){4}/)
          .expect(202)
          .end(function(err, res) {
            should.not.exist(err)
            res.body.should.eql('')
            done()
          })
      })

    })

    describe('GET /stuff/{requestId}', function() {

      it('should return a HTTP 200 answer with the correct body', function(done) {

        request(server)
          .get('/stuff')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err)
            const locationHeaderValue = res.get('Location')
            locationHeaderValue.should.exist()
            locationHeaderValue.startsWith('/stuff/').should.be.exactly(true)
            res.body.should.eql('')
            done()
          })
      })

    })

  })

})
