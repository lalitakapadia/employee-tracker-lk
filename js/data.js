// TODo this should be shared object use by like department, role, employee

const mysql = require('mysql2');

const StringBuilder = require("string-builder");

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '',
    database: 'companyDb'
  },
  console.log(`Connected to the companyDb database.`)
);


function Data(){}

module.exports = Data;