const assert = require('assert');
const request = require('supertest');
const app = require('../app');

// Test GET / request
describe('The express app', () => {
  it('handles a GET request to /', (done) => {
    request(app)
      .get('/')
      .end((err, response) => {
        assert(response.header['content-type'] === 'text/html; charset=UTF-8');
        done();
      });
  });

});
