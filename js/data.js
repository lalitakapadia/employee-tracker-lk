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

Data.prototype.viewDepartments = () => {
  const query = 'SELECT * FROM department';
  console.log("get in departments");
  db.query('SELECT * FROM department', function(err, rows) {
    console.log("rows: " + JSON.stringify(rows));
  });
};
// in this block r = roles, d = department
 Data.prototype.viewAllRoles = () => {
  const query = 'SELECT * FROM role';
  console.log("get all roles");
  db.query('SELECT r.id, r.title, r.salary, d.name FROM role r INNER JOIN department d ON r.department_id = d.id', function(err, rows) {
    console.log("rows: " + JSON.stringify(rows));
  });
};
Data.prototype.viewAllEmployees = () => {
  // string builder for displaying all employees in the department and their roles
  // query.append is to make it easier to write long string query into small string
  const query = new StringBuilder();
  // e = employee, r = role, d = department
  query.append('SELECT e.id, e.first_name, e.last_name, e.manager_id, r.title, r.salary, d.name ');
  query.append('FROM employee e ');
  query.append('INNER JOIN role r ON e.role_id = r.id ');
  query.append('INNER JOIN department d ON r.department_id = d.id');

  console.log(query.toString());
  db.query(query.toString(), function(err, rows) {
    if (err) { throw err; }
    console.log("rows:" + JSON.stringify(rows));
  });

}

module.exports = Data;