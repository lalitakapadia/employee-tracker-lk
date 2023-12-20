// import mysql2
const inquirer = require('inquirer');
const CompanyDatabase = require('../js/data.js');
const Department = require('../js/departments.js');

function Role(){}

// in this block r = roles, d = department
 Role.prototype.viewAllRoles = async() => {
  const companyDatabase = new CompanyDatabase();
  const query = 'SELECT * FROM role';
  const con = await companyDatabase.createConnection();
  const roles = await con.execute(query);
  return roles;
};

// function for add Role to Department
Role.prototype.addRole = () => {
  const department = new Department();
  department.viewDepartments()
  .then(([departmentRows]) => {
    let departments = departmentRows.map(({id, name}) =>({key: id, value: name}));
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary rate?",
        },
        {
          type: "list",
          name: "department",
          mesaage: "Which department is the role under",
          choices: departments
        }
      ])
      .then((answers) => {
        let selectedDepartmentIndex = departmentRows.findIndex(r => r.name === answers.department);
        insertRole(answers.title, answers.salary, departments[selectedDepartmentIndex].key);
      });
    });    
 };

 async function insertRole(title, salary, department_id) {
  const companyDatabase = new CompanyDatabase();
  const query = `INSERT INTO role(title, salary, department_id) VALUES ('${title}', '${salary}', '${department_id}')`;
  const con = await companyDatabase.createConnection();
  const result = await con.execute(query);
  console.log("result: " + JSON.stringify(result));
 };

module.exports = Role;
