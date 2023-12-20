const inquirer = require('inquirer');
const Department = require('../js/departments.js');
const Role = require('../js/roles.js');
const Employee = require('../js/employees.js');
const CompanyDatabase = require('../js/data.js');

function Task(){}

 
Task.prototype.askQuestion = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "task",
        message: "what would you like to do?",
        choices: [
          "View All Departments", 
          "View All Roles", 
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role"
        ]
      }
    ]).then((answers) => {
      getData(answers.task);
    });
  };


function getData (task) {
    switch(task) {
      case "View All Departments":
        const department1 = new Department();
        let d = department1.viewDepartments();
        break;

      case "View All Roles":
        const role = new Role();
        let r = role.viewAllRoles();
        break;
        
      case "View All Employees":
        const  employee = new Employee();
        let e = employee.viewAllEmployees();
        break;
        
      case "Add a Department":
        promptDepartment(); // calling addDepartment function to get user input
        break;
        
      case "Add a Role":
        promptRole(); // calling addRole function to get user input
        break;
        
      case "Add an Employee":
        promptEmployee(); // calling addEmployee function to get user input
        break;
        
      case "Update an Employee Role":
        promptUpdateEmployee();
        break;
      
      default:
        console.log("Please select a valid task");
        break;
  }
  };

// function for add department
function promptDepartment(){
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "Enter Department Name:"
      }
    ]).then((answers) => {
      const department = new Department();
      department.addDepartment(answers.department);
    });
  };

  // function for add Role to Department
  function promptRole()  {
    const companyDatabase = new CompanyDatabase();
    const query = 'SELECT * FROM department';
    let departments = [];
    companyDatabase.createConnection().query(query, (err, rows) =>{
      if (err) { 
        throw err; 
      } else {

        for (let i = 0; i < rows.length; i++) {
          let current = {
            key: rows[i].id,
            value: rows[i].name
          }
          departments.push(current);
        } 
        console.log(JSON.stringify(departments));
      }
    });

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
        for (const d in departments) {
          console.log(departments[d]);
          if ( departments[d].value === answers.department) {
            const role = new Role();
            role.addRole(answers.title, answers.salary,  departments[d].key);
        }
      }
    });
   }
  
   // function for add new employees to the department
  function promptEmployee() {

    const companyDatabase = new CompanyDatabase();
    let query = 'SELECT id, title FROM role';
    let roles = [];
    companyDatabase.createConnection().query(query, (err, rows) =>{
      if (err) { 
        throw err; 
      } else {
  
        for (let i = 0; i < rows.length; i++) {
          let current = {
            key: rows[i].id,
            value: rows[i].title
          }
          roles.push(current);
        } 
      }
    });

    // get all the employees
      query = 'SELECT id, first_name, last_name FROM employee';
      let employees = [];
      companyDatabase.createConnection().query(query, (err, rows) =>{
        if (err) { 
          throw err; 
        } else {
    
          for (let i = 0; i < rows.length; i++) {
            let current = {
              key: rows[i].id,
              value: rows[i].first_name + " " + rows[i].last_name
            }
            employees.push(current);
          } 
        }
      });

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

        //declare a varible to store employee id
        let manager_id = 0;
        //loop through the employees to find selected employee
        for (const e in employees) {
          if (employees[e].value === answers.manager_name) {
            // when match is found, store the value in the variable
            manager_id = employees[e].key;
            break;
          }
        }
        
        let role_id = 0;
        for (const r in roles) {
          if ( roles[r].value === answers.role_title) {
            role_id = roles[r].key;
            break;
          }
        }

        const e = new Employee();
        e.addEmployee(answers.first_name, answers.last_name, role_id, manager_id);
      });
}

async function promptUpdateEmployee() {
  const companyDatabase = new CompanyDatabase();
  let query = 'SELECT id, title FROM role';
  let roles1 = [];
  companyDatabase.createConnection().query(query, (err, rows) =>{
    if (err) { 
      throw err; 
    } else {

      for (let i = 0; i < rows.length; i++) {
        let current = {
          key: rows[i].id,
          value: rows[i].title
        }
        roles1.push(current);
      } 
    }
  });

  console.log(`*******${JSON.stringify(roles1)}`);

  // get all the employees
  query = 'SELECT id, first_name, last_name FROM employee';
  var employees1 = [];
  companyDatabase.createConnection().query(query, (err, rows) =>{
    if (err) { 
      throw err; 
    } else {
      
      for (let i = 0; i < rows.length; i++) {
        let current = {
          key: rows[i].id,
          value: rows[i].first_name + " " + rows[i].last_name
        }
        employees1.push(current);
        console.log(JSON.stringify(current));
        console.log(JSON.stringify(employees1));
      } 
    }
  });

  console.log(`*******${JSON.stringify(employees1)}`);
  await inquirer
      .prompt([
        {
          type: 'list', // change this to list
          name: 'employee_name',
          message: 'Select the employee to update his/her role?',
          choices: employees1
        },
        {
          type: 'list',
          name: 'role_title',
          message: 'What is the new role?',
          choices: roles1
        } 
      ])
      .then((answers) => {

        //declare a varible to store employee id
        let employee_id = 0;
        //loop through the employees to find selected employee
        for (const e in employees1) {
          if (employees1[e].value === answers.employee_name) {
            // when match is found, store the value in the variable
            employee_id = employees1[e].key;
            break;
          }
        }
        
        let role_id = 0;
        for (const r in roles1) {
          if ( roles1[r].value === answers.role_title) {
            role_id = roles1[r].key;
            break;
          }
        }

        const e = new Employee();
        e.updateEmployee(employee_id, role_id);
      });

}



module.exports = Task;