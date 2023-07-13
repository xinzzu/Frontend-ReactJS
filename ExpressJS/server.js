const express = require('express');
const mongoose = require('mongoose');
const mahasiswaRouter = require('../ExpressJS/routers/mahasiswarouters');
const userRouter = require('../ExpressJS/routers/users');
const cors = require('cors');
const app = express();
const port = 8000; // Adjust the port as needed

app.use(cors());

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://azis:1234@cluster0.qejy4pl.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Middleware
app.use(express.json());

// Routes
app.use('/api/', mahasiswaRouter);
app.use('/api/', userRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
