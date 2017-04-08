const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const PostSchema = new Schema({
  title: String,
  author: String,
  content: String,
  tag: String
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
