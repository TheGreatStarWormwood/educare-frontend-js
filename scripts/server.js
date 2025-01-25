const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 5505;

app.use(cors({
    origin: 'http://127.0.0.1:5500',  // Allow only your frontend to make requests
    methods: ['GET', 'POST'],         // Allow the methods you need
}));
// Setup MySQL connection pool
const pool = mysql.createConnection({
    host: 'localhost', // Use 'localhost' to refer to your host machine.
    port: 3307,         // Use port 3307 since it's mapped to the container's port 3306.
    user: 'root',       // Use 'root' as the username (or another MySQL user if different).
    password: 'root',   // Use the root password you specified in the Docker command.
    database: 'lms' // Replace with your actual database name.
  });

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint to get all students
app.get('/students', (req, res) => {
    pool.query('SELECT * FROM students', (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving students');
        }
        res.json(rows);
    });
});

// Endpoint to get a specific student by ID
app.get('/students/:id', (req, res) => {
    const studentId = req.params.id;
    pool.query('SELECT * FROM students WHERE id = ?', [studentId], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving student');
        }
        if (rows.length === 0) {
            return res.status(404).send('Student not found');
        }
        res.json(rows[0]);
    });
});

// Endpoint to get all tutors
app.get('/tutors', (req, res) => {
    pool.query('SELECT * FROM tutors', (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving tutors');
        }
        res.json(rows);
    });
});

// Endpoint to get a specific tutor's LMS courses
app.get('/tutors/:id/lms', (req, res) => {
    const tutorId = req.params.id;
    pool.query('SELECT * FROM lms WHERE tutorId = ?', [tutorId], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving tutor LMS courses');
        }
        res.json(rows);
    });
});

// Endpoint to get all enrollments for a student
app.get('/students/:id/enrollments', (req, res) => {
    const studentId = req.params.id;
    pool.query('SELECT * FROM enrollments WHERE studentId = ?', [studentId], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving enrollments');
        }
        res.json(rows);
    });
});

// Endpoint to get all tutors filtered by search query (keywords)
app.get('/tutors/search', (req, res) => {
    const query = req.query.query || '';
    pool.query('SELECT * FROM tutors WHERE name LIKE ?', [`%${query}%`], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving tutors');
        }
        res.json(rows);
    });
});

// Start server
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
