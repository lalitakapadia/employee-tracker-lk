const inquirer = require('inquirer');
const Data = require('../js/data.js');

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
        const data = new Data();
        let d = data.viewDepartments();
        break;

      case "View All Roles":
        console.log("View All Roles");
        break;
        
      case "View All Employees":
        console.log("View All Employees");
        break;
        
      case "Add a Department":
        console.log("Add a Department");
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


  module.exports = Task;