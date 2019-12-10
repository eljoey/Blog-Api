require('dotenv').config()

const express = require('express')
const session = require('express-session')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const logger = require('./utils/logger')

const loginRouter = require('./routes/login')
const apiRouter = require('./routes/api')

const app = express()

const mongoose = require('mongoose')
const mongoDB = process.env.MONGODB_URI

logger.info('Connecting to MongoDB...')

mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    logger.info('Connected to MongoDB...')
  })
  .catch(err => {
    logger.error('error connecting to MongoDB')
  })

app.use('/login', loginRouter)
app.use('/api', apiRouter)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`app listening on port ${PORT}`))
