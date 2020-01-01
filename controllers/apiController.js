const jwt = require('jsonwebtoken')

exports.api_get = (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET, (err, authData) => {
    if (err) {
      res.status(401).json({ error: 'Invalid Token' })
    } else {
      res.json({ msg: 'heres the blogs', authData })
    }
  })
}
