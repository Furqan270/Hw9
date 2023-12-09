const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')
const errorHandler = require('./middleware/error_handle')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const limiter = rateLimit( {
    max : 10,
    message : "too much Requiest"
})

app.use(limiter)
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server Connected`)
})