const mysql = require('mysql2');
const inquirer = require('inquirer');
const CompanyDatabase = require('../js/data.js');
const Role = require('../js/roles.js');
const StringBuilder = require("string-builder");

function Employee(){}

Employee.prototype.viewAllEmployees = async() => {
  const companyDatabase = new CompanyDatabase();
  // string builder for displaying all employees in the department and their roles
  // query.append is to make it easier to write long string query into small string
  const query = new StringBuilder();
  // e = employee, r = role, d = department
  query.append('SELECT e.id, e.first_name, e.last_name, e.manager_id, r.title, r.salary, d.name ');
  query.append('FROM employee e ');
  query.append('INNER JOIN role r ON e.role_id = r.id ');
  query.append('INNER JOIN department d ON r.department_id = d.id');
  const con = await companyDatabase.createConnection();
  const employee = await con.execute(query.toString());
  return employee;
}

//function for add new employees to the department
Employee.prototype.addEmployee = async () => {
  const role = new Role();
  const employee = new Employee();
  let roles = [];
  let employees = [];
  let roleRows;
  let employeeRows;
  let selectedRoleIndex;
  let selectedManagerIndex;
  let first_name, last_name;

  await role.viewAllRoles()
  .then(([roleResult]) => {
      roles = roleResult.map(({id, title}) =>({key: id, value: title}));
      roleRows = roleResult;
  });

  
  await employee.viewAllEmployees()
  .then(([employeeResult]) => {
      employees = employeeResult.map(({id, first_name, last_name}) =>({key: id, value: first_name + ' ' + last_name}));
      employeeRows = employeeResult;
    });
  
  await inquirer
    .prompt([
    {
    type: 'input',
    name: 'first_name',
    message: 'What is the first name of the new employee?'
    },
    {
    type: 'input',
    name: 'last_name',
    message: 'What is the last name of the new employee?'
    },
    {
    type: 'list',
    name: 'role_title',
    message: 'What role is the new employee in?',
    choices: roles
    },
    {
    type: 'list', // change this to list
    name: 'manager_name',
    message: 'Who is the manager for the new employee?',
    choices: employees
    }
    ])
    .then((answers) => {
      selectedManagerIndex = employeeRows.findIndex(r => r.first_name + ' ' + r.last_name === answers.manager_name);
      selectedRoleIndex = roleRows.findIndex(r => r.title === answers.role_title);
      first_name = answers.first_name;
      last_name = answers.last_name;
    });
  await insertEmployee(first_name, last_name, roles[selectedRoleIndex].key,  employees[selectedManagerIndex].key);
};


async function insertEmployee(first_name, last_name, role_id, manager_id) {
  const companyDatabase = new CompanyDatabase();
  const query = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('${first_name}', '${last_name}', '${role_id}', '${manager_id}')`;

  const con = await companyDatabase.createConnection();
  const result = await con.execute(query.toString());
  console.log("result: " + JSON.stringify(result));
}


Employee.prototype.updateEmployeeRole = async () => {
  const role = new Role();
  const employee = new Employee();
  let roles = [];
  let employees = [];
  let roleRows, employeeRows;
  let selectedEmployeeIndex;
  let selectedRoleIndex;

  await role.viewAllRoles()
  .then(([roleResult]) => {
      roles = roleResult.map(({id, title}) =>({key: id, value: title}));
      roleRows = roleResult;
  });

  await employee.viewAllEmployees()
  .then(([employeeResult]) => {
      employees = employeeResult.map(({id, first_name, last_name}) =>({key: id, value: first_name + ' ' + last_name}));
      employeeRows = employeeResult;
    });

    await inquirer
    .prompt([
      {
        type: 'list', // change this to list
        name: 'employee_name',
        message: 'Select the employee to update his/her role?',
        choices: employees
      },
      {
        type: 'list',
        name: 'role_title',
        message: 'What is the new role?',
        choices: roles
      } 
    ])
    .then((answers) => {
      selectedEmployeeIndex = employeeRows.findIndex(r => r.first_name + ' ' + r.last_name === answers.employee_name);
      selectedRoleIndex = roleRows.findIndex(r => r.title === answers.role_title);
    });

    await updateEmployeeRoleDb(employees[selectedEmployeeIndex].key, roles[selectedRoleIndex].key);
  }

  async function updateEmployeeRoleDb (employee_id, new_role_id) {
    const companyDatabase = new CompanyDatabase();
    const sql = `UPDATE employee SET role_id = '${new_role_id}' WHERE id = '${employee_id}'`;
    const con = await companyDatabase.createConnection();
    const result = await con.execute(sql.toString());
    console.log("result: " + JSON.stringify(result));
  };



  // additional functionality for assignment
  //  Update employee managers.

  Employee.prototype.updateEmployeeManager = async () => {
    let employee = new Employee();
    let employees = [];
    let employeeRows;
    let selectedEmployeeIndex;
    let selectedManagerIndex;

    await employee.viewAllEmployees()
     .then(([employeeResult]) => {
      employees = employeeResult.map(({id, first_name, last_name}) =>({key: id, value: first_name + ' ' + last_name}));
      employeeRows = employeeResult;
    });
    await inquirer
    .prompt([
      {
        type: 'list', // change this to list
        name: 'employee_name',
        message: 'Select the employee to update his/her manager?',
        choices: employees
      },
      {
        type: 'list',
        name: 'new_manager',
        message: 'Select new manager?',
        choices: employees
      } 
    ])
    .then((answers) => {
      selectedEmployeeIndex = employeeRows.findIndex(r => r.first_name + ' ' + r.last_name === answers.employee_name);
      selectedManagerIndex = employeeRows.findIndex(r => r.first_name + ' ' + r.last_name === answers.new_manager);
    });
    await updateEmployeeManagerDb(employees[selectedEmployeeIndex].key, employees[selectedManagerIndex].key);
  }
  async function updateEmployeeManagerDb (employee_id, new_manager_id) {
    const companyDatabase = new CompanyDatabase();
    const sql = `UPDATE employee SET manager_id = '${new_manager_id}' WHERE id = '${employee_id}'`;
    const con = await companyDatabase.createConnection();
    const result = await con.execute(sql.toString());
    console.log("result: " + JSON.stringify(result));
  };

//View employees by manager.
Employee.prototype.viewEmployeeByManager = async () => {
 
}

module.exports = Employee;
