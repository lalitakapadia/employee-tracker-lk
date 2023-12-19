
const mysql = require('mysql2');
const CompanyDatabase = require('../js/data.js');

const StringBuilder = require("string-builder");

function Department(){}

Department.prototype.viewDepartments =  () => {
  const companyDatabase = new CompanyDatabase();
  const query = 'SELECT * FROM department';
  console.log("get in departments");
  companyDatabase.createConnection().query(query, (err, rows) =>{
    console.log("in db query...");
    if (err) { 
      throw err; 
    } else {
      console.log("rows**: " + JSON.stringify(rows));
    }
    return rows;
  });
  
};
// add department to database
Department.prototype.addDepartment = (name) => {
  const companyDatabase = new CompanyDatabase();
  const query = `INSERT INTO department(name) VALUES (?)`;
  const params = [name];
  companyDatabase.createConnection().query(query, params, function (err, result) {
    if (err) { throw err; };
    console.log("result: " + JSON.stringify(result));
  });
};

module.exports = Department;