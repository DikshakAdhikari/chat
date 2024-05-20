const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const initializeSocket = require('./socket');
const chatRouter = require('./routes/chat');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.DATABASE_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/chat', chatRouter  )


const PORT = process.env.PORT || 5000;
const serverr= app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
initializeSocket(serverr);