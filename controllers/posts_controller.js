const Post = require('../models/post');

module.exports = {

  getPosts(req, res, next) {
    Post.find().limit(100).exec((err, posts) => {
      res.send(posts);
    }).catch(next);
      // .then(post => {
      //   res.send(post);
      //   console.log(post.title);
      // }).catch(next);
  },
  // getAdmin(req, res, next) {
  //   res.sendFile('../public/admin.html', { root: __dirname });
  //
  // },

  createPosts(req, res, next) {
    console.log(req.body.content);

    const postProps = req.body;

    Post.create(postProps)
      .then((post) => {
        res.redirect('/').send(post);
      })
        .catch(next);
  }

}
