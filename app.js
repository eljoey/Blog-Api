const express = require('express')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const loginRouter = require('./routes/login')
const apiRouter = require('./routes/api')

const app = express()

const mongoose = require('mongoose')
const mongoDB = config.MONGODB_URI

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

app.use(helmet())
app.use(cors())
app.use(bodyParser.json())

app.use(middleware.requestLogger)
app.use(middleware.getToken)

// app.use('/', (req, res) => {
//   res.send('access denied')
// })
app.use('/login', loginRouter)
app.use('/api', apiRouter)

const PORT = config.PORT || '3000'
app.listen(PORT, () => console.log(`app listening on port ${PORT}`))
