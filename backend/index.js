const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRoute = require('./routes/students');
const dotenv = require('dotenv');
require("dotenv").config();
  

const app = express();
app.use(express.json());
app.use(cors());


// Replace with your MongoDB connection string
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/studentdb";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.use('/api/students', studentRoute);

const PORT = process.env.PORT || 5000;

const server=app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports={app, server};