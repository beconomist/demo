const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const PostSchema = new Schema({
  title: String,
  author: String,
  content: String,
  tag: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
