const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// ============================
// GET /todos - Get all todos
// ============================
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    console.log("Fetched all todos");
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======================================
// GET /todos/:id - Get a single todo by ID
// ======================================
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ============================
// POST /todos - Create a new todo
// ============================
router.post('/', async (req, res) => {
  console.log("Creating new todo:", req.body);

  try {
    const { item, completed = false } = req.body;
    const todo = new Todo({ item, completed });

    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    console.error("Error creating todo:", err);
    res.status(400).json({ message: err.message });
  }
});

// =================================
// PUT /todos/:id - Update a todo
// =================================
router.put('/:id', async (req, res) => {
  console.log("Updating todo:", req.body);

  try {
    const { item, completed } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { item, completed },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(updatedTodo);
  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(400).json({ message: err.message });
  }
});

// ===============================
// DELETE /todos/:id - Delete a todo
// ===============================
router.delete('/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
