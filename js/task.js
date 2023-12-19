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
        console.log("Update an Employee Role");
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
  async function promptRole()  {
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

    await inquirer
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
        type: 'input',
        name: 'role_id',
        message: 'What role is the new employee in?',
      },
      {
        type: 'input',
        name: 'manager_id',
        message: 'Who is the manager for the new employee?'
      }

      ])
      .then((answers) => {
        const role = new Employee();
        role.addEmployee(answers.first_name, answers.last_name, answers.role_id, answers.manager_id);
      });

}

  module.exports = Task;