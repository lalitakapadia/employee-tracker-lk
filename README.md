# employee-tracker-lk

## Description

 This is a command line interface (CLI) application written in JavaScript and built using Node.js and npm (specifically the Inquirer, MySQL2, console.table, and dotenv packages). This CLI application asks a user a series of questions through CLI prompts and then adds the user's answers to a SQL database.

To run this application locally, follow this steps:
 1. Clone the repository to your local machine.
 2. At the command line, run npm install to install the dependencies.
 3. Create .env file in the root directory of the project. Add user, password and localhost to secure user's password   not showing on repositories
 4. Run the "node server.js" to start the application and then user can presented with questiones.
 
 There are separated files for department, employee, and roles for coding as keep them as neat as possible because files has very long and repetitive code inside.

 In this application added some extra functionality work as well.

 The user interface is a command line application. The user is presented with a series of prompts to select from. The user can select from the following options:
 View All Departments,
 View All Roles,  
 View All Employees, 
 Add a Department, 
 Add a Role, 
 Add an Employee,
 Update an Employee Role,
 Update Employee Manager,
 View Employee by manager,
 Exit the program 

 The user can select an option by using the up and down arrow keys and pressing enter. Depending on the option selected, the user may be prompted for additional information. The user can end the application at any time by selecting the Exit the program option.
 
 User can interact with the application to view departments, roles, and employees.
 User can add new departments, roles, and employees, as needed.
 User can update employee roles, as needed.

![Alt text](assets/images/entity-relationship-diagram.png)

Video demonstrate Link for Assignment

https://drive.google.com/file/d/1LC5s0rUSlUVF4Lt7M6xA-T0mKCwfvTY6/view?usp=drive_link