//Created Table for signup details as users
//Created Table for registeration details as service_requests


const express = require('express');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());


const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '1234',//your password
    database: process.env.DB_NAME || 'bike_hub',//your database name
    connectionLimit: 10, 
});

db.getConnection((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1); 
    } else {
        console.log('MySQL Connected...');
    }
});


const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret_key";


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: 'Unauthorized access: No token provided' });
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            console.log('Token validation error:', err.message);
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};


app.get('/profile', authenticateToken, (req, res) => {
    const sql = 'SELECT full_name, email, dob, phone FROM users WHERE id = ?';
    db.query(sql, [req.user.id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(results[0]);
    });
});


app.post('/signup', async (req, res) => {
    const { fullName, email, dob, phone, password } = req.body;


    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (full_name, email, dob, phone, password) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [fullName, email, dob, phone, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: 'Email already exists' });
                }
                return res.status(500).json({ message: 'Database error', error: err });
            }
            res.json({ message: 'User registered successfully!' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error processing sign-up request' });
    }
});


app.post('/service-request', authenticateToken, (req, res) => {
    const { name, phone, bikeModel, serviceDate, issue, selectedBike } = req.body;
    const userId = req.user.id;
    const initialStatus = 'Pending';

    const sql = `
        INSERT INTO service_requests (user_id, name, phone, bike_model, service_date, issue, selected_bike, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [userId, name, phone, bikeModel, serviceDate, issue, selectedBike, initialStatus], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(201).json({ message: 'Service request submitted successfully!', requestId: result.insertId });
    });
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (results.length === 0) return res.status(400).json({ message: 'Invalid email or password' });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    });
});


app.get('/service-status', authenticateToken, (req, res) => {
    const userId = req.user.id;

    const sql = `SELECT name, phone, bike_model, service_date, issue,selected_bike, status 
                 FROM service_requests WHERE user_id = ?`;
    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.json(results);
    });
});


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
