// TODo this should be shared object use by like department, role, employee

const mysql = require('mysql2/promise');
require('dotenv').config();

function CompanyDatabase(){}

// Connect to database
CompanyDatabase.prototype.createConnection = () => { 
  return mysql.createConnection(
  {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'companyDb'
  });
}


module.exports = CompanyDatabase;
