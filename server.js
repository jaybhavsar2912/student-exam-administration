const express = require('express');
require('dotenv').config();
const cors = require('cors');
const ConnectDB = require('./db/_con');
const authRoutes = require('./Routes/auth');
const examRoutes = require('./Routes/exam');
const resultRoutes = require('./Routes/result');
const studentRoutes = require('./Routes/manageStudent');
const { errorHandler } = require('./Middleware/errorHandler');

const app = express();
const port = process.env.PORT;

ConnectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/auth', authRoutes);
app.use('/exams', examRoutes);
app.use('/results', resultRoutes);
app.use('/manage-student', studentRoutes);
app.use(errorHandler);

app.use((req, res, next) => {
  console.log('HTTP Method - ' + req.method + ',URL - ' + req.url);
  next();
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
