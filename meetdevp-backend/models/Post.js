const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: String,
  avatar: String,
  title: String,
  price: String,
  desc: String,
  date: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  comments: [String]
});

module.exports = mongoose.model('Post', postSchema);