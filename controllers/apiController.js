const jwt = require('jsonwebtoken')

exports.api_get = (req, res, next) => {
  if (!req.token) {
    return res.status(401).json({ error: 'token missing' })
  }

  const decodedToken = jwt.verify(
    req.token,
    process.env.SECRET,
    (err, decoded) => {
      if (err) return res.status(401).json({ error: 'invalid token' })

      // Correct Token
      return decoded
    }
  )
  console.log(decodedToken)
  res.json('msg: heres the blogs')
}
