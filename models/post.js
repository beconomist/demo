const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  content: String,
  tag: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }]
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
