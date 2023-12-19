const mysql = require('mysql2');
const CompanyDatabase = require('../js/data.js');
const StringBuilder = require("string-builder");

function Employee(){}

Employee.prototype.viewAllEmployees = () => {
  const companyDatabase = new CompanyDatabase();
  // string builder for displaying all employees in the department and their roles
  // query.append is to make it easier to write long string query into small string
  const query = new StringBuilder();
  // e = employee, r = role, d = department
  query.append('SELECT e.id, e.first_name, e.last_name, e.manager_id, r.title, r.salary, d.name ');
  query.append('FROM employee e ');
  query.append('INNER JOIN role r ON e.role_id = r.id ');
  query.append('INNER JOIN department d ON r.department_id = d.id');

  console.log(query.toString());
  companyDatabase.createConnection().query(query.toString(), function(err, rows) {
    if (err) { throw err; }
    console.log("rows:" + JSON.stringify(rows));
  });
}

Employee.prototype.addEmployee = (first_name, last_name, role_id, manager_id) => {
  const companyDatabase = new CompanyDatabase();
  const query = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
  const params = [first_name,  last_name, role_id, manager_id];
  companyDatabase.createConnection().query(query, params, function (err, result) {
    if (err) { throw err; };
    console.log("result: " + JSON.stringify(result));
  });
};


module.exports = Employee;
