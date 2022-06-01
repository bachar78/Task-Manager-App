const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db.js')
const PORT = process.env.PORT || 5000
const memberRoutes = require('./routes/memberRoutes')
const tasksRoutes = require('./routes/tasksRoutes')
const { errorHandler } = require('./middleware/errorMiddleware')
const path = require('path')
//connect to database
connectDB()

const app = express()

//Body parser middleware
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(express.json({ limit: '50mb' }))

//Routers
app.use('/api/members', memberRoutes)
app.use('/api/tasks', tasksRoutes)

//Serve Frontend
if (process.env.NODE_ENV === 'production') {
  //Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  app.get('*', (req, res) => {
    res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
  })
} else {
  //Home Route
  app.get('/', (req, res) => {
    res.status(200).send({ message: 'Welcome to the task manager application' })
  })
}

//Error Handler middleware
app.use(errorHandler)

app.listen(PORT, () => console.log(`server starts on port ${PORT}`))
