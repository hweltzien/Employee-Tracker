const inquirer = require('inquirer');
// Import and require Pool (node-postgres)

const { Pool } = require('pg');


// Connect to database
const pool = new Pool(
  {
    // TODO: Enter PostgreSQL username
    user: 'postgres',
    // TODO: Enter PostgreSQL password
    password: '1A2b3c4%',
    host: 'localhost',
    database: 'employees_db',
    port: 5432,
  },
  console.log(`Connected to the employee_db database.`)
)

// pool.connect();

//// Create an array of questions for user input
const questions = [
  {
    type: "list",
    name: "choice",
    message: "What would you like to do?",
    choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "exit"]
  },
];

// Create a function to handle user input
function mainMenu() {
  inquirer.prompt(questions).then((answers) => {
    console.log(answers);
    switch (answers.choice) {
      case "view all departments":
        viewDepartments();

        break;
      case "view all roles":
        viewRoles();

        break;
      case "view all employees":
        viewEmployees();

        break;
      case "add a department":
        addDepartment();
        
        break;
      case "add a role":
        addRole();
       
        break;
      case "add an employee":
        addEmployee();
        
        break;
      case "update an employee role":
        updateEmployeeRole();
        
// break;
// case "delete a department":
//   deleteDepartment();


        break;
      case "exit":
        process.exit();
        
        break;
      default:
        console.log("Invalid choice");
        break;
    }
  });
}

function viewDepartments() {
  const sql = `SELECT * from departments`;

  pool.query(sql, (err, result) => {
    console.table(result.rows);
    mainMenu();
  });
}

function viewRoles() {
  pool.query(`SELECT * FROM roles`, (err, res) => {
    if (err) throw err;
    console.table(res.rows);
    // pool.end();
    mainMenu();
  });
}

function viewEmployees() {
  pool.query(`SELECT * FROM employees`, (err, res) => {
    if (err) throw err;
    console.table(res.rows);
    // pool.end();
    mainMenu();
  });
}


function addDepartment() {
  const sql = `INSERT INTO departments (name)
    VALUES ($1)`;
  const params = "Legal"
  inquirer.prompt({
    type: "input",
    name: "department",
    message: "What is the name of the department?"
  }).then((answers) => {
    pool.query(sql, [answers.department], (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log("Department added.")
      mainMenu();
    });
  });

}

function addRole() {
  const sql = `INSERT INTO roles (title, salary, department_id)
    VALUES ($1, $2, $3)`;

  inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of the role?"
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary of the role?"
    },
    {
      type: "input",
      name: "department_id",
      message: "What is the department ID?"
    }
  ]).then((answers) => {
    pool.query(sql, [answers.title, answers.salary, answers.department_id], (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log("Role added.")
      mainMenu();
    });
  });

}

function addEmployee() {
  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES ($1, $2, $3, $4)`;

  inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is the employee's first name?"
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the employee's last name?"
    },
    {
      type: "input",
      name: "role_id",
      message: "What is the role ID?"
    },
    {
      type: "input",
      name: "manager_id",
      message: "What is the manager ID?"
    }
  ]).then((answers) => {
    pool.query(sql, [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log("Employee added.")
      mainMenu();
    });
  });

}

function updateEmployeeRole() {
  const sql = `UPDATE employees SET role_id = $1 WHERE id = $2`;

  inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "What is the employee ID?"
    },
    {
      type: "input",
      name: "role_id",
      message: "What is the new role ID?"
    },
  ]).then((answers) => {
    pool.query(sql, [answers.role_id, answers.id], (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log("Employee role updated.")
      mainMenu();
    });
  });

}

// function deleteDepartment() {
//   const sql = `DELETE FROM departments WHERE id = $1`;

//   inquirer.prompt([
//     {
//       type: "input",
//       name: "id",
//       message: "What is the department ID?"
//     }
//   ]).then((answers) => {
//     pool.query(sql, [answers.id], (err, result) => {
//       if (err) {
//         console.log(err);
//       }
//       console.log("Department deleted.")
//       mainMenu();
//     });
//   });

// }

mainMenu();
