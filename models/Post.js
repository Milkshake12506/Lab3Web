const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  publication_date: {
    type: Date,
    default: Date.now
  },
  tags: [String],
  view_count: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
