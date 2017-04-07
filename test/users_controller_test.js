const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const User = mongoose.model('user');

describe('Users controller testing', () => {

  // Create user test
  it('POST to /users creates a new user', (done) => {
    User.count().then(count => {
      request(app)
        .post('/users')
        .send({
          username: 'myTestName',
          password: 'myTestPassword',
          email: 'myTest@email.com'
        })
        .end(() => {
          User.count().then(newCount => {
            assert(count + 1 === newCount);
          });
        done();
      });
    });
  });

  // Read user test
  // it('GET to /users/id reads an existing user', (done) => {
  //
  //
  //
  // });

  // Update user test
  it('PUT to /users/id edits an existing user', (done) => {
    const user = new User({
      username: 'myTestName',
      password: 'myTestPassword',
      email: 'myTest@email.com'
    });

    user.save().then(() => {
      request(app)
        .put(`/users/${user._id}`)
        .send({ password: 'myNewTestPassword' })
        .end(() => {
          User.findOne({ username: user.username })
            .then(user => {
              assert(user.password === 'myNewTestPassword');
              done();
            });
        });
    });
  });

  // Delete user test
  it('DELETE to /users/id deletes an existing user', (done) => {
    const user = new User({
      username: 'myTestName',
      password: 'myTestPassword',
      email: 'myTest@email.com'
    });

    user.save().then(() => {
      request(app)
        .delete(`/users/${user._id}`)
        .end(() => {
          User.findOne({ username: 'myTestName' })
            .then((user) => {
              // Add the try catch block to catch err when assert fails
              try {
                assert(user === null);
                done();
              }
              catch(e) {
                done(e);
              }
            });
        });
    });
  });




});
