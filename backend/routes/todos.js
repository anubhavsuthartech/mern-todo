const express = require('express')
const router = express.Router()
const Todo = require('../models/Todo')
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
  const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 })
  res.json(todos)
})

router.post('/', auth, async (req, res) => {
  const todo = await Todo.create({
    user: req.user.id,
    text: req.body.text,
    priority: req.body.priority || 'medium'
  })
  res.status(201).json(todo)
})

router.put('/:id', auth, async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id })
  if (!todo) return res.status(404).json({ message: 'Not found' })
  if (req.body.text !== undefined) todo.text = req.body.text
  if (req.body.completed !== undefined) todo.completed = req.body.completed
  if (req.body.priority !== undefined) todo.priority = req.body.priority
  const updated = await todo.save()
  res.json(updated)
})

router.delete('/:id', auth, async (req, res) => {
  await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id })
  res.json({ message: 'Deleted' })
})

module.exports = router