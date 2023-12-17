const mysql = require('mysql2');

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
  const query = 'SELECT * from department';
  console.log("get in departments");
  db.query('SELECT * FROM department', function(err, rows) {
    console.log("rows: " + rows);
  });
  // db.query(query, (err, res) => {
  //   if (err) throw err;
  //   console.log(`result: ${res}`);
  //   return res;
  //});
};


module.exports = Data;