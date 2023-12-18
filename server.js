const express = require('express');
// Import and require mysql2

const Task = require('./js/task.js');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const task = new Task();
const selectedTask = task.askQuestion();
