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
//console.log(selectedTask);
//task.getData(selectedTask);

// // Connect to database
// const db = mysql.createConnection(
//   {
//     host: 'localhost',
//     // MySQL username,
//     user: 'root',
//     // TODO: Add MySQL password here
//     password: '',
//     database: 'companyDb'
//   },
//   console.log(`Connected to the companyDb database.`)
// );


// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

