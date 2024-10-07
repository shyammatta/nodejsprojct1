// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const employeeRoutes = require('./routes/employeeRoutes');


const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files

// Routes
app.use('/api/employees', employeeRoutes);


// Serve React Frontend in Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/employeeDB', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})


.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});