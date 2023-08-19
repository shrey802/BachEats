const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {// Replace with your frontend's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(bodyParser.json());
app.use(cors(corsOptions));

// Create a connection pool to the PostgreSQL database
const pool = new Pool({
  user: 'shreyash',
  password: 'utopiathegoat',
  host: 'localhost', // Update this if your Docker setup is different
  port: 5432, // Default PostgreSQL port
  database: 'sweetDB'
});

// get the registration page
app.get('/', (req, res) => {
  res.status(201);
});

// store and create an account
app.post('/register', async (req, res) => {
  try {
    const { email, password, fullname, address, contactNumber } = req.body;
    
    // Generate a UUID for userID
    const userID = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (userid, email, password, fullname, address, contactNumber) VALUES ($1, $2, $3, $4, $5, $6)';
    await pool.query(query, [userID, email, hashedPassword, fullname, address, contactNumber]);
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get the homepage
app.get('/home', (req, res) => {
  res.status(200);
})

// we get the login page here
app.get('/login', (req, res) => {
  res.status(200);
})

// we verify the user credentials to login the user
app.post('/loginVerify', async(req, res) => {
  try {
    const {email, password} = req.body;
    const query = 'SELECT * FROM users WHERE email=$1';
    const result = await pool.query(query, [email]);
    if(result.rows.length === 0){
      // User not found
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Password doesn't match
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Password matches, user is authenticated
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.json(error);
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
