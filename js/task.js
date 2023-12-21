const inquirer = require('inquirer');
const Department = require('../js/departments.js');
const Role = require('../js/roles.js');
const Employee = require('../js/employees.js');
const { printTable } = require('console-table-printer');

function Task(){}
 
Task.prototype.askQuestion = async () => {

  await inquirer
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


async function getData (choice) {
  const department = new Department();
  const role = new Role();
  const employee = new Employee();
  const task = new Task();

    switch(choice) {
      case "View All Departments":
        department.viewDepartments().then(([departmentRows]) => {
          printTable(departmentRows);
        }).then(task.askQuestion);
        break;

      case "View All Roles":
        let r = role.viewAllRoles().then(([roleRows]) => {
          printTable(roleRows);
        }).then(task.askQuestion);
        break;
        
      case "View All Employees":
        let e = employee.viewAllEmployees().then(([employeeRows]) => {
          printTable(employeeRows);
        }).then(task.askQuestion);
        break;
        
      case "Add a Department":
        await department.addDepartment().then (task.askQuestion);
        break;
        
      case "Add a Role":
        // calling addRole function to get user input
        await role.addRole().then (task.askQuestion);
        break;
        
      case "Add an Employee":
        // calling addEmployee function to get user input
        await employee.addEmployee().then (task.askQuestion);
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