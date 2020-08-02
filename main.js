const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')
const cookieParser = require('cookie-parser')
const formidableMiddleware = require('express-formidable')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors')
// const { adminBro, adminAuth } = require('./utils/adminBro')

const foodRouter = require('./routes/foodRouter')
const ingredientRouter = require('./routes/ingredientRouter')
const globalErrorHandler = require('./controllers/errorController')
// const session = require('express-session')
const PouchSession = require('session-pouchdb-store')
// const AdminBroExpressjs = require('admin-bro-expressjs')

const app = express()
app.use(formidableMiddleware())

// app.use(session({
//   secret:'secret-key',
//   resave:false,
//   saveUninitialized:true
// }))

app.use(cors())
app.options('*', cors())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const limiter = rateLimit({
  max: 10000, //do zmiany na prod!
  windowMs: 3600 * 1000,
  message: 'too many request from this IP, try again later',
})
app.use('/api', limiter)
app.use(express.json({ limit: '10kb' }))
// app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(cookieParser())
app.use(mongoSanitize())
app.use(xss())

app.use((req, res, next) => {
  // console.log('Hello from the middleware 👋')
  next()
})

app.get('/api/test', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'test',
  })
})

// app.use(
//   adminBro.options.rootPath,
//   AdminBroExpressjs.buildAuthenticatedRouter(adminBro, adminAuth, null, {
//     maxAge: 60 * 1000,
//     expires: new Date(Date.now() + 60 * 1000),
//     resave: false,
//     saveUninitialized: true,
//     store: new PouchSession(),
//   })
//   // AdminBroExpressjs.buildRouter(adminBro)
// )
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

app.use(bodyParser.json())

// app.use(bodyParser())

app.use('/api/v1/food', foodRouter)
app.use('/api/v1/ingredient', ingredientRouter)

app.use(globalErrorHandler)

module.exports = app
