const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Todo');

const app = express();

// ✅ CORS setup for Vercel frontend
app.use(cors({
  origin: 'https://dailychores-app-4e61.vercel.app', // your Vercel frontend
  credentials: true,
}));

app.use(express.json());

// ✅ MongoDB connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  // useUnifiedTopology: true,  // ❌ deprecated, remove
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.get('/get', async (req, res) => {
  res.send('Hello from Express!');  
  try {
    const todos = await TodoModel.find({});
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

app.post('/add', async (req, res) => {
  try {
    const todo = await TodoModel.create({ task: req.body.task });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

app.delete('/delete/:id', async (req, res) => {
  try {
    const todo = await TodoModel.findByIdAndDelete(req.params.id);
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
