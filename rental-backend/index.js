const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql2 = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql2.createConnection({
  host: 'localhost',
  user: 'root', // Update if needed
  password: '@kadzoelina12', // Update if needed
  database: 'rental_platform' // Update if needed
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL2 database.');
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(query, [username, email, password], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Registration failed' });
    } else {
      res.status(201).json({ message: 'User registered successfully' });
    }
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Database error' });
    } else if (results.length > 0) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  });
});


app.listen(5000, () => {
  console.log('Backend running on http://localhost:3000');
});
