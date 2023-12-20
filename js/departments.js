
const CompanyDatabase = require('../js/data.js');
const inquirer = require('inquirer');
const StringBuilder = require("string-builder");

function Department(){}

// view department function
Department.prototype.viewDepartments = async () => {
  const companyDatabase = new CompanyDatabase();
  const query = 'SELECT * FROM department';
  const con = await companyDatabase.createConnection();
  const departmentRows = await con.execute(query);
  return departmentRows;
};

// function is to prompt and add department
Department.prototype.addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "Enter Department Name:"
      }
    ]).then((answers) => {
      return insertDepartment(answers.department);
    });
};

async function insertDepartment(department) {
  const companyDatabase = new CompanyDatabase();
  const sql = `INSERT INTO department(name) VALUES ('${department}')`;
  const con = await companyDatabase.createConnection();
  const result = await con.execute(sql);
  console.log(result);
  return result;
}

module.exports = Department;