const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

// const User = require('../models/user');
const User = mongoose.model('user');
const Post = require('../models/post');
const Comment = require('../models/comment');

describe('Users controller testing', () => {

  // Create user test: passing!
  it('POST to /users creates a new user', (done) => {
    User.count().then(count => {
      request(app)
        .post('/users')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          name: 'bao',
          password: '11111',
          email: 'bao@example.com'
        })
        .end(() => {
          User.count().then(newCount => {
            // console.log(`count: ${count}, newCount: ${newCount}`);
            assert(count + 1 === newCount);
          });
        done();
        });
    });
  });

  // Authentication test: passing!
  it('Authenication test', (done) => {
    request(app)
      .post('/users')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        name: 'bao',
        password: '11111',
        email: 'bao@example.com'
      })
      .end(() => {
        User.findOne({ name: 'bao'}, (err, user) => {
          if (err) throw err;
          // 測試密碼正確
          user.comparePassword('11111', function(err, isMatch) {
            if (err) throw err;
            assert(isMatch === true);
            done();
          });
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
  xit('PUT to /users/id edits an existing user', (done) => {
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
  xit('DELETE to /users/id deletes an existing user', (done) => {
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
