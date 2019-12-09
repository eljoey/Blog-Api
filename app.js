require('dotenv').config

const express = require('express')
const session = require('express-session')
const passport = require('passport')
const logger = require('./utils/logger')

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
