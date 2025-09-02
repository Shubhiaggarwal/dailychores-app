const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/todolistDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

// Routes
app.get('/get', async (req, res) => {
  try {
    const todos = await TodoModel.find({});
    res.json(todos);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/add', async (req, res) => {
  try {
    const todo = await TodoModel.create({ task: req.body.task });
    res.json(todo);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete('/delete/:id', async (req, res) => {
  try {
    const todo = await TodoModel.findByIdAndDelete(req.params.id);
    res.json(todo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Start server
app.listen(3001, () => console.log("Server running on port 3001"));
