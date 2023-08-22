const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bcrypt = require('bcrypt');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {// Replace with your frontend's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
  origin: 'http://localhost:3000'
};
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use(
  session({
    secret: 'richflex',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
    },
  })
);
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
    req.session.userID = userID;
    res.status(201).json({ message: 'User registered successfully', userID });
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

app.post('/create-payment', async (req, res) => {
  try {
    const { amount, currency, description, source } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description,
      payment_method: source, // Payment source (e.g., card token or payment method)
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating PaymentIntent:', error);
    res.status(500).json({ error: error.message });
  }
});



app.get('/about', async (req, res) => {
  res.status(200);
})

app.get('/contact', async (req, res) => {
  res.status(200);
})

// we verify the user credentials to login the user
app.post('/loginVerify', async (req, res) => {
  try {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email=$1';
    const result = await pool.query(query, [email]);
    if (result.rows.length === 0) {
      // User not found
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Password doesn't match
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    req.session.userID = user.userid;
    // Password matches, user is authenticated
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.json(error);
  }
})


app.post('/logout', async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/submitQuery', async (req, res) => {
  try {
    const { email, query } = req.body;
    const queryText = 'INSERT INTO queries (email, query) VALUES ($1, $2)';
    await pool.query(queryText, [email, query]);

    res.status(201).json({ message: 'Query submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/products', (req, res) => {
  res.status(200).json({ message: 'Product Page Rendered' })
})

app.get('/getallSweets', async (req, res) => {
  try {
    const query = 'SELECT * FROM products';
    const result = await pool.query(query);
    const products = result.rows;
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.get('/getSweet/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM products WHERE product_id = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    const sweet = result.rows[0];
    res.status(200).json(sweet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
