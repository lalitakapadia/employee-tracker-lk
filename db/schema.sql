DROP DATABASE IF EXISTS companyDb;

CREATE DATABASE companyDb;

USE companyDb;

CREATE TABLE department (
    id INT AUTOINCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL
    FOREIGN KEY (id) REFERENCES
);

CREATE TABLE employee (
    id INT PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
    manager_id INT NOT NULL
);