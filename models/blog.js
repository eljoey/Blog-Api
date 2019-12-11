const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogSchema = new Schema({
  title: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  likes: { type: Number },
  dislikes: { type: Number },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
