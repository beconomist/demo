const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  content: String,
  post: {
    type: Schema.Types.ObjectId,
    ref: 'post'
  }
});

const Tag = mongoose.model('tag', TagSchema);

module.exports = Tag;
