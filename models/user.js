const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: 3
  },
  passwordHash: String,
  blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }]
})

const User = mongoose.model('User', userSchema)

module.exports = User
