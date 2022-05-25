
const express = require('express')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

// Controllers
const { globalErrorHandler } = require('./controllers/error.controllers')

// Routers
const { userRouter } = require('./routes/users.routes')
const { cartRouter } = require('./routes/carts.routes')
const { productRouter } = require('./routes/products.routes')

// Init express app
const app = express()

// Enable incoming JSON data
app.use(express.json())

// Limit IP requests
const limiter = rateLimit({
  max: 10000,
  windowMs: 1 * 60 * 60 * 1000, // 1 hr
  message: 'Too many requests from this IP'
})

app.use(limiter)

// Endpoints
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/cart', cartRouter)

// GLOBAL ERROR HANDLER
app.use('*', globalErrorHandler)

module.exports = { app }
