
const mysql = require('mysql2');
const CompanyDatabase = require('../js/data.js');
const StringBuilder = require("string-builder");

function Role(){}

// in this block r = roles, d = department
 Role.prototype.viewAllRoles = () => {
  const companyDatabase = new CompanyDatabase();
  const query = 'SELECT * FROM role';
  console.log("get all roles");
  companyDatabase.createConnection().query('SELECT r.id, r.title, r.salary, d.name FROM role r INNER JOIN department d ON r.department_id = d.id', function(err, rows) {
    if (err) { throw err; };
    console.log("rows: " + JSON.stringify(rows));
  });
};

module.exports = Role;
