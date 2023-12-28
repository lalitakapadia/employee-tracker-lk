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
Role.prototype.addRole = async () => {
  const department = new Department();
  let departments = [];
  let departmentRows;
  let selectedDepartmentIndex;
  let title, salary; 
  
  await department.viewDepartments()
  .then(([rows]) => {
     departments = rows.map(({id, name}) =>({key: id, value: name}));
     departmentRows = rows;
    });   

  await  inquirer
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
      selectedDepartmentIndex = departmentRows.findIndex(r => r.name === answers.department);
      title = answers.title;
      salary = answers.salary;
    });
    await insertRole(title, salary, departments[selectedDepartmentIndex].key);   
 };

 async function insertRole(title, salary, department_id) {
  const companyDatabase = new CompanyDatabase();
  const query = `INSERT INTO role(title, salary, department_id) VALUES ('${title}', '${salary}', '${department_id}')`;
  const con = await companyDatabase.createConnection();
  const result = await con.execute(query);
  if(result[0].affectedRows === 1) {
    console.log(`Role
     '${title}' added successfully`);
  }
 };

 // function to delete  a role
 Role.prototype.deleteRole = async () => {
  let role = new Role();
  let roles = [];
  let roleRows;
  let selectedRoleIndex;

  await role.viewAllRoles()
  .then(([rows]) => {
    roles = rows.map(({id, title}) =>({key: id, value: title}));
    roleRows = rows;
    });   

  await  inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Select a role to delete?",
        choices: roles
      }
    ]) 
    .then((answers) => {
      selectedRoleIndex = roleRows.findIndex(r => r.title === answers.role);
    });
  const companyDatabase = new CompanyDatabase();
  const sql = `DELETE FROM role WHERE id = ${roles[selectedRoleIndex].key}`;
  const con = await companyDatabase.createConnection();
  const result = await con.execute(sql);
  if(result[0].affectedRows === 1) {
    console.log(`Role '${roles[selectedRoleIndex].value}' deleted successfully`);
  }
  return result;
}
 
module.exports = Role;
