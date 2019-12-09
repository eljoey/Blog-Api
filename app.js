require('dotenv').config

const express = require('express')
const session = require('express-session')
const passport = require('passport')

const mongoose = require('mongoose')
const mongoDB = process.env.MONGODB_URI

console.log('Connecting to MongoDB...')
mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => {
    console.log('error connecting to MongoDB')
  })
