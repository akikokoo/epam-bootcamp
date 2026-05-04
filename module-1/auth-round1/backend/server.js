const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/authdb'
});

const SECRET = process.env.JWT_SECRET || 'secret';

// Register
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hash]);
    res.json({ message: 'User created' });
  } catch (err) {
    res.status(400).json({ error: 'User already exists' });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1d' });
  res.json({ token });
});

// Reset password (basic)
app.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;
  const hash = await bcrypt.hash(newPassword, 10);
  await pool.query('UPDATE users SET password = $1 WHERE email = $2', [hash, email]);
  res.json({ message: 'Password updated' });
});

app.listen(3001, () => console.log('Server running on port 3001'));
