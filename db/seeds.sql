-- INSERT DATA
INSERT INTO department (name)
VALUES ('Customer Service'), ('HR'), ('Payroll');

INSERT INTO role (title, salary, department_id)
VALUES ('Area Manager', 40000.00, 1),
    ('Store Manager', 35000.00, 1),
    ('Manager', 32000.00, 1),
    ('Customer Service', 25000.00, 1),
    ('Manager', 40000.00, 2),
    ('Administrator', 30000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Glenn', 'Doe', 1, NULL),
     ('John', 'JD', 2, 1),
    ('Jade', 'Chan', 3, 2),
    ('Lalita', 'K', 4, 2),
    ('Gemma', 'Tupik', 5, 2),
    ('Nikki', 'Brown', 6, NULL);
