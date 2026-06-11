const dotenv = require('dotenv');
dotenv.config(); // ← لازم يكون أول شي دائماً

const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

// Import routes
const authRoutes         = require('./src/routes/auth.routes');
const childRoutes        = require('./src/routes/child.routes');
const sdqRoutes          = require('./src/routes/sdq.routes');
const assessmentRoutes   = require('./src/routes/assessment.routes');
const psychologistRoutes = require('./src/routes/psychologist.routes');
const adminRoutes        = require('./src/routes/admin.routes');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/auth',         authRoutes);
app.use('/api/children',     childRoutes);
app.use('/api/sdq',          sdqRoutes);
app.use('/api/assessments',  assessmentRoutes);
app.use('/api/psychologist', psychologistRoutes);
app.use('/api/admin',        adminRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Helping Hand API is running ' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});