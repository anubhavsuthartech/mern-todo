const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/todos', require('./routes/todos'))

const MONGO_URI = 'mongodb://127.0.0.1:27017/mern-todo'

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(5000, () => console.log('Server running on port 5000'))
  })
  .catch(err => console.error('DB Error:', err.message))