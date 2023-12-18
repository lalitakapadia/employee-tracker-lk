
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


function Department(){}

Department.prototype.viewDepartments = () => {
  const query = 'SELECT * FROM department';
  console.log("get in departments");
  db.query(query, function(err, rows) {
    if (err) { throw err; };
    console.log("rows: " + JSON.stringify(rows));
  });
};
// add department to database
Department.prototype.addDepartment = (name) => {
  const query = `INSERT INTO department(name) VALUES (?)`;
  const params = { name: 'name'};
  db.query(query, params, function (err, result) {
    if (err) { throw err; };
    console.log("result: " + JSON.stringify(result));
  });
};

module.exports = Department;