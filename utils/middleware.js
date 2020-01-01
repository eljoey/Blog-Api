const logger = require('./logger')
const jwt = require('jsonwebtoken')

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

const verifyTokenPresent = (req, res, next) => {
  if (!req.token) {
    res.status(401).json({ error: 'token missing' })
  } else {
    next()
  }
}

module.exports = {
  requestLogger,
  getToken,
  verifyTokenPresent
}
