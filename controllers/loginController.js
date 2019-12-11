const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

exports.login = async (req, res, next) => {
  const body = req.body
  console.log(body)
  const user = await User.findOne({ username: body.username })
  const passCorrect =
    user === null ? false : bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  res.status(200).send({ token })
}
