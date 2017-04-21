
const assert = require('assert');
const request = require('supertest');
const mongoose= require('mongoose');
const app = require('../app');

const Post = mongoose.model('post');

describe('Posts controller test', () => {

  it.only('creates a post to /postForm', (done) => {
    request(app)
      .post('/postForm')
      .send({
        title: 'New Post',
        content: 'New Content',
        tag: 'Random'
      })
      .end(() => {
        Post.findOne({ title: 'New Post' })
          .then((post) => {
            console.log(post);
            assert(post.title === 'New Post');
            done();
          });
      });
  });

});
