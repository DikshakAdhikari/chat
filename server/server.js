const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const initializeSocket = require('./socket');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.DATABASE_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;
const serverr= app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
initializeSocket(serverr);