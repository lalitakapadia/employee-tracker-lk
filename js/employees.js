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
Employee.prototype.addEmployee = () => {

  const role = new Role();
  role.viewAllRoles()
  .then(([roleResult]) => {
      let roles = roleResult.map(({id, title}) =>({key: id, value: title}));

      const employee = new Employee();
      employee.viewAllEmployees()
      .then(([employeeResult]) => {
          let employees = employeeResult.map(({id, first_name, last_name}) =>({key: id, value: first_name + ' ' + last_name}));
    
          inquirer
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
            let selectedManagerIndex = employeeResult.findIndex(r => r.first_name + ' ' + r.last_name === answers.manager_name);
            let selectedRoleIndex = roleResult.findIndex(r => r.title === answers.role_title);

            insertEmployee(answers.first_name, answers.last_name, roles[selectedRoleIndex].key,  employees[selectedManagerIndex].key);
          });
        });
    });
  }

  async function insertEmployee(first_name, last_name, role_id, manager_id) {
    const companyDatabase = new CompanyDatabase();
    const query = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('${first_name}', '${last_name}', '${role_id}', '${manager_id}')`;

    const con = await companyDatabase.createConnection();
    const result = await con.execute(query.toString());
    console.log("result: " + JSON.stringify(result));
  }


  Employee.prototype.updateEmployeeRole = () => {
    const role = new Role();
    role.viewAllRoles()
    .then(([roleResult]) => {
      let roles = roleResult.map(({id, title}) =>({key: id, value: title}));
      
      const employee = new Employee();
      employee.viewAllEmployees()
      .then(([employeeResult]) => {
        let employees = employeeResult.map(({id, first_name, last_name}) =>({key: id, value: first_name + ' ' + last_name}));
        
        inquirer
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
          let selectedEmployeeIndex = employeeResult.findIndex(r => r.first_name + ' ' + r.last_name === answers.employee_name);
          let selectedRoleIndex = roleResult.findIndex(r => r.title === answers.role_title);
          updateEmployeeRoleDb(employees[selectedEmployeeIndex].key, roles[selectedRoleIndex].key);
        });
      });
    });
}

async function updateEmployeeRoleDb (employee_id, new_role_id) {
  const companyDatabase = new CompanyDatabase();
  const sql = `UPDATE employee SET role_id = '${new_role_id}' WHERE id = '${employee_id}'`;
  const con = await companyDatabase.createConnection();
  const result = await con.execute(sql.toString());
  console.log("result: " + JSON.stringify(result));
};

module.exports = Employee;
