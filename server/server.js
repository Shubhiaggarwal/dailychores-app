const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Todo');

const app = express();
app.use(cors({
  origin: 'http://dailychores-app-4e61-1hlx5obfx-shubhis-projects-6fd93980.vercel.app', // replace with your actual Vercel URL
  credentials: true
}));

app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
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
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

