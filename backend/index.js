const express = require('express');
const cors = require('cors');
require('dotenv').config();

const taskRoutes = require('./routes/tasks');

const app = express();

app.use(cors());
app.use(express.json()); // lets Express read JSON request bodies

app.use('/api/tasks', taskRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'TaskFlow API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});