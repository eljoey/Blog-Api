const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogSchema = new Schema({
  title: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, require: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  timestamp: { type: Date, required: true, default: Date.now() }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
