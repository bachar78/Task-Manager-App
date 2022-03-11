const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db.js')
const PORT = process.env.PORT || 5000
const memberRoutes = require('./routes/memberRoutes')
const tasksRoutes = require('./routes/tasksRoutes')
const { errorHandler } = require('./middleware/errorMiddleware')

//connect to database
connectDB()

const app = express()

//Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Home Route
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome' })
})
//Routers
app.use('/api/members', memberRoutes)
app.use('/api/tasks', tasksRoutes)


//Error Handler middleware
app.use(errorHandler)

app.listen(PORT, () => console.log(`server starts on port ${PORT}`))
