const express = require('express')
const app = express()
require('dotenv').config()
//Import Connection
const connectDb = require('./database/connect')
// Import Routes
const taskRoutes = require('./routes/tasks')
// Import Not Found Route
const notFound = require('./middlewares/not-found')
const errorHandlerMiddleware = require('./middlewares/error-handler')

// Use Middlewares
app.use(express.static('./public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Use Routes
app.use('/api/v1/tasks', taskRoutes)
// Not Found Page
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}
start()
