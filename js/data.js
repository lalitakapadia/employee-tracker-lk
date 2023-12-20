// TODo this should be shared object use by like department, role, employee

const mysql = require('mysql2/promise');
require('dotenv').config();

function CompanyDatabase(){}

// Connect to database
CompanyDatabase.prototype.createConnection = () => { 
  return mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '', //process.env.DB_PASSWORD,
    database: 'companyDb'
  });
}
module.exports = CompanyDatabase;