const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  content: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }],
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'tag'
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
