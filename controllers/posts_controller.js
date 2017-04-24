const Post = require('../models/post');

module.exports = {


  create(req, res, next) {
      const postProps = req.body;
      Post.create(postProps)
        .then((post) => {
          res.redirect('/');
        })
        .catch(next);

  },

  readAll(req, res, next) {
    Post.find().limit(100).exec((err, posts) => {
      res.send(posts);
    }).catch(next);
      // .then(post => {
      //   res.send(post);
      //   console.log(post.title);
      // }).catch(next);
  },

  readOne(req, res, next) {


  },

  update(req, res, next) {


  },

  delete(req, res, next) {



  }

}
