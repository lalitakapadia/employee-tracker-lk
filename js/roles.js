
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

function Role(){}

// in this block r = roles, d = department
 Role.prototype.viewAllRoles = () => {
  const query = 'SELECT * FROM role';
  console.log("get all roles");
  db.query('SELECT r.id, r.title, r.salary, d.name FROM role r INNER JOIN department d ON r.department_id = d.id', function(err, rows) {
    if (err) { throw err; };
    console.log("rows: " + JSON.stringify(rows));
  });
};

module.exports = Role;
