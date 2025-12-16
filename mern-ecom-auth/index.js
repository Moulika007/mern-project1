const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');

const port = process.env.PORT || 5000;

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

// Routes
app.use('/api/pets', require('./routes/petRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoute')); // Keep for backward compatibility

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'PetHaven API is running!', timestamp: new Date().toISOString() });
});

// Error handler
app.use(errorHandler);

// Start Server
app.listen(port, () => {
  console.log(`🚀 PetHaven Server started on port ${port}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 API Health: http://localhost:${port}/api/health`);
});