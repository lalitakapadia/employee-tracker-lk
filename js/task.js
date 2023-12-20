const inquirer = require('inquirer');
const Department = require('../js/departments.js');
const Role = require('../js/roles.js');
const Employee = require('../js/employees.js');

function Task(){}
 
Task.prototype.askQuestion = () => {

  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "what would you like to do?",
        choices: [
          "View All Departments", 
          "View All Roles", 
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
          "Exit the program"
        ]
      }
    ]).then((answers) => {
      getData(answers.choice);
    });
  };


function getData (choice) {
  const department = new Department();
  const role = new Role();
  const employee = new Employee();
  const task = new Task();
  
    switch(choice) {
      case "View All Departments":
        department.viewDepartments().then(([departmentRows]) => {
          console.log(departmentRows);
        }).then(task.askQuestion);
        break;

      case "View All Roles":
        let r = role.viewAllRoles().then(([roleRows]) => {
          console.log(roleRows);
        }).then(task.askQuestion);
        break;
        
      case "View All Employees":
        let e = employee.viewAllEmployees().then(([employeeRows]) => {
          console.log(employeeRows);
        }).then(task.askQuestion);
        break;
        
      case "Add a Department":
        department.addDepartment();
        break;
        
      case "Add a Role":
        // calling addRole function to get user input
        role.addRole();
        break;
        
      case "Add an Employee":
        // calling addEmployee function to get user input
        employee.addEmployee();
        break;
        
      case "Update an Employee Role":
        employee.updateEmployeeRole();
        break;
      
      default:
        console.log("Please select a valid task");
        break;
  }
  };
module.exports = Task;