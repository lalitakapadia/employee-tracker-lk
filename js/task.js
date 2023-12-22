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
          "Update Employee Manager",
          "View Employee by Manager",
          //"View Employee by Department",
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
        await employee.updateEmployeeRole().then (task.askQuestion);
        break;
        // extra functionality for assignment tasks
      case "Update Employee Manager":
        await employee.updateEmployeeManager().then (task.askQuestion);
        break;  
       //View employees by manager.
      case "View Employee by Manager":
        employee.viewEmployeeByManager().then(([employeeRows]) => {
          printTable(employeeRows);
        }).then(task.askQuestion);
        break; 

      // case "View Employee by Department":
      //   viewEmployeeByDepartment();
      //   break; 

      default:
        console.log("Ending the program");
        break;
  }
  };
module.exports = Task;