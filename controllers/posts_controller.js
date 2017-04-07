const Post = require('../models/post');

module.exports = {

  getPosts(req, res, next) {
    res.sendFile('../db/blogPosts.json', {  root:__dirname
    });
  },

}
