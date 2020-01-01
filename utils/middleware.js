const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

const getToken = (req, res, next) => {
  const auth = req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    req.token = auth.substring(7)
  }
  next()
}

const verifyToken = (req, res, next) => {
  const decodedToken = jwt.verify(
    req.token,
    process.env.SECRET,
    (err, decoded) => {
      if (err) return res.status(401).json({ error: 'invalid token' })

      // Correct Token
      return decoded
    }
  )

  if (!req.token || !decodedToken) {
    return res.status(401).json({ error: 'token missing' })
  }

  next()
}

module.exports = {
  requestLogger,
  getToken
}
