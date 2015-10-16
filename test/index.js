const join = require('path').join
const expect = require('chai').expect
const fly = {}

require('../').call(fly)

describe('index', () => {
  it('pass', (done) => {
    fly.unwrap = f => f([ join(__dirname, '/data/pass.vim') ])
    fly.vimlint()
      .then(() => done())
      .catch(err => {
        console.error(err)
        done('test should be succeeded')
      })
  })

  it('fail', (done) => {
    fly.unwrap = f => f([ join(__dirname, '/data/fail.vim') ])
    fly.vimlint()
      .then(() => done('test should be failed'))
      .catch(err => {
        try {
          expect(err).to.be.a('string')
          expect(err).to.be.string('1/1 files lint failed')
        }
        catch (e) { return done(e) }
        done()
      })
  })
})
