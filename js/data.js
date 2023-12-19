// TODo this should be shared object use by like department, role, employee

const mysql = require('mysql2');
require('dotenv').config();

function CompanyDatabase(){}

// Connect to database
CompanyDatabase.prototype.createConnection = () => { 
  return mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'LKBootcamp#2023', //process.env.DB_PASSWORD,
    database: 'companyDb'
  });
}
module.exports = CompanyDatabase;