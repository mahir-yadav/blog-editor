const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const blogRoutes = require('./routes/blogroutes');

const app = express();

// ✅ CORS Middleware - put this first!
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

// ✅ Body parser
app.use(express.json());

// ✅ Register routes
app.use('/api/blogs', blogRoutes);

// ✅ MongoDB connection
mongoose.connect('mongodb://localhost:27017/blogEditorDB')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// ✅ Start server
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
