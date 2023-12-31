
const CompanyDatabase = require('../js/data.js');
const inquirer = require('inquirer');
//const { Connection } = require('mysql2/typings/mysql/lib/Connection.js');
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
Department.prototype.addDepartment = async () => {
  await inquirer
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
  if(result[0].affectedRows === 1) {
    console.log(`Department '${department}' added successfully`);
  }
  return result;
}

//delete department
Department.prototype.deleteDepartment = async () => {
  let department = new Department();
  let departments = [];
  let departmentRows;
  let selectedDepartmentIndex;

  await department.viewDepartments()
  .then(([rows]) => {
     departments = rows.map(({id, name}) =>({key: id, value: name}));
     departmentRows = rows;
    });   

  await  inquirer
    .prompt([
      {
        type: "list",
        name: "department",
        message: "Select department to delete?",
        choices: departments
      }
    ]) 
    .then((answers) => {
      selectedDepartmentIndex = departmentRows.findIndex(r => r.name === answers.department);
    });
  const companyDatabase = new CompanyDatabase();
  const sql = `DELETE FROM department WHERE id = ${departments[selectedDepartmentIndex].key}`;
  const con = await companyDatabase.createConnection();
  const result = await con.execute(sql);
  if(result[0].affectedRows === 1) {
    console.log(`Department '${departments[selectedDepartmentIndex].value}' deleted successfully`);
  }
  return result;
}


module.exports = Department;