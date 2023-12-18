const inquirer = require('inquirer');
const Data = require('../js/data.js');
const Department = require('../js/departments.js');
const Role = require('../js/roles.js');
const Employee = require('../js/employees.js');

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
        console.log("Add a Role");
        break;
        
      case "Add an Employee":
        console.log("Add an Employee");
        break;
        
      case "Update an Employee Role":
        console.log("Update an Employee Role");
        break;
      
      default:
        console.log("Please select a valid task");
        break;
  }
  };
  



   
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


  module.exports = Task;