const should = require('should')
const request = require('supertest')
const server = require('../../../app')

describe('controllers', function() {

  describe('keep_alive', function() {

    describe('GET /ka', function() {

      it('should return a default JSON serialized status object', function(done) {

        request(server)
          .get('/ka')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err)

            res.body.should.eql({status:'OK'})

            done()
          })
      })

    //   it('should accept a name parameter', function(done) {

    //     request(server)
    //       .get('/hello')
    //       .query({ name: 'Scott'})
    //       .set('Accept', 'application/json')
    //       .expect('Content-Type', /json/)
    //       .expect(200)
    //       .end(function(err, res) {
    //         should.not.exist(err)

    //         res.body.should.eql('Hello, Scott!')

    //         done()
    //       })
    //   })

    })

  })

})
