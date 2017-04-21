const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

// const User = require('../models/user');
const User = mongoose.model('user');
const Post = require('../models/post');
const Comment = require('../models/comment');

describe('Users controller testing', () => {

  // Create user test
  it('POST to /users creates a new user', (done) => {
    // const bao = new User({
    //   name: 'Bao',
    //   password: '11111',
    //   email: 'bao@example.com'
    // });
    const post = new Post({
      title: 'On Self-Teaching Programming',
      content: 'Some content about self-teaching yourself programming'
    });
    const comment = new Comment({
      conent: 'Thanks for sharing.'
    });

    // bao.posts.push(post);
    // post.comments.push(comment);
    // comment.user = bao;

    User.count().then(count => {
      request(app)
        .post('/users')
        .send({
          name: 'Bao',
          password: '11111',
          email: 'bao@example.com'
        })
        .end(() => {
          User.count().then(newCount => {
            console.log(`count: ${count}, newCount: ${newCount}`);
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
