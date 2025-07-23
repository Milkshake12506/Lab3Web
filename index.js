const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors());

app.use(express.json());

const taskRoutes = require('./routes/taskRoutes');
app.use('/', taskRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');
  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
