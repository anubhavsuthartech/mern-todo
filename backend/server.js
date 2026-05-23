const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/todos', require('./routes/todos'))

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern-todo'
const PORT = process.env.PORT || 5000

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch(err => console.error('DB Error:', err.message))