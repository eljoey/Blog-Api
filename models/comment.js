const mongoose = require('mongoose')
const moment = require('moment')

const Schema = mongoose.Schema

const commentSchema = new Schema({
  name: { type: String, required: true },
  timestamp: { type: String, required: true, default: Date.now() },
  text: { type: String, required: true },
  blogId: { type: Schema.Types.ObjectId, ref: 'Blog' }
})

// Put timestamp into easy to read format(1hr ago, 3days ago, etc.)
commentSchema.virtual('date_formatted').get(function() {
  return moment(this.timestamp).fromNow()
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
