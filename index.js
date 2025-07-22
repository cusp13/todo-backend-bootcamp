const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const todoRoutes = require('./routes/todos');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// ------------------
// 🛡️ Middlewares
// ------------------

// Enable CORS for React frontend
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Parse incoming JSON payloads
app.use(express.json());

// ------------------
// 🚏 API Routes
// ------------------
app.use('/todos', todoRoutes);

// ------------------
// ⚡ MongoDB Connection
// ------------------
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ------------------
// 🚀 Start Server
// ------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
