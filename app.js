const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
// const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors')

const foodRouter = require('./routes/foodRouter')
const ingredientRouter = require('./routes/ingredientRouter')
const globalErrorHandler = require('./controllers/errorController')

const app = express()

app.use(cors())
app.options('*', cors())

app.use(helmet())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const limiter = rateLimit({
  max: 100,
  windowMs: 3600 * 1000,
  message: 'too many request from this IP, try again later',
})
app.use('/api', limiter)
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
// app.use(cookieParser());
app.use(mongoSanitize())
app.use(xss())

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋')
  next()
})

app.get('/api/test', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'test',
  })
})

app.use('/api/v1/food', foodRouter)
app.use('/api/v1/ingredient', ingredientRouter)

app.use(globalErrorHandler)

module.exports = app
