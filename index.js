const inquirer = require('inquirer');
// Import and require Pool (node-postgres)
// We'll be creating a Connection Pool. Read up on the benefits here: https://node-postgres.com/features/pooling
const { Pool } = require('pg');


// Connect to database
const pool = new Pool(
  {
    // TODO: Enter PostgreSQL username
    user: 'postgres',
    // TODO: Enter PostgreSQL password
    password: '1A2b3c4%',
    host: 'localhost',
    database: 'employees',
    port: 5432,
  },
  console.log(`Connected to the employee_db database.`)
)

pool.connect();

//// Create an array of questions for user input
const questions = [
    {
        type: "list",
        name: "menu",
        message: "Please select the ___.",
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
    },
];

// Create a movie

  const sql = `INSERT INTO movies (movie_name)
    VALUES ($1)`;
  // const params = [body.movie_name];

  // pool.query(sql, params, (err, result) => {
    
  // });
function viewDepartments() {
  const sql = `SELECT * from departments`;

pool.query(sql, (err, result) => {
  console.table(result.rows);
});
}

// viewDepartments();

function addDepartment() {
  const sql = `INSERT INTO departments (name)
    VALUES ($1)`;
  const params = "Legal"

  pool.query(sql, params, (err, result) => {
    console.log("Department added.")
  });
}
addDepartment();
// if ________.shape = "view all departments" {
//   viewDepartments();
// }

// // Read all movies
// app.get('/api/movies', (req, res) => {
//   const sql = `SELECT id, movie_name AS title FROM movies`;

//   pool.query(sql, (err, { rows }) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// // Delete a movie
// app.delete('/api/movie/:id', (req, res) => {
//   const sql = `DELETE FROM movies WHERE id = $1`;
//   const params = [req.params.id];

//   pool.query(sql, params, (err, result) => {
//     if (err) {
//       res.statusMessage(400).json({ error: err.message });
//     } else if (!result.rowCount) {
//       res.json({
//         message: 'Movie not found'
//       });
//     } else {
//       res.json({
//         message: 'deleted',
//         changes: result.rowCount,
//         id: req.params.id
//       });
//     }
//   });
// });

// // Read list of all reviews and associated movie name using LEFT JOIN
// app.get('/api/movie-reviews', (req, res) => {
//   const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`;
//   pool.query(sql, (err, { rows }) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// // Update an employee role
// app.put('/api/role/:id', (req, res) => {
//   const sql = `UPDATE roles SET role = $1 WHERE id = $2`;
//   const params = [req.body.review, req.params.id];

//   pool.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//     } else if (!result.rowCount) {
//       res.json({
//         message: 'Role not found'
//       });
//     } else {
//       res.json({
//         message: 'success',
//         data: req.body,
//         changes: result.rowCount
//       });
//     }
//   });
// });

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
