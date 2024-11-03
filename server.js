// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/gettreat')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

// Simple route for root
app.get('/', (req, res) => {
    res.send('Welcome to the Get Treat API!');
});

// Signup endpoint
app.post('/api/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const newUser = new User({ email, password }); // Hash password in production
        await newUser.save();
        res.json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password }); // Hash password check in production
    if (user) {
        res.json({ success: true, email: user.email });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Get User Profile
app.get('/api/user', async (req, res) => {
    // Logic to retrieve user profile based on session or token
    // This example needs session management or token-based authentication
});

// Delete Account
app.delete('/api/user', async (req, res) => {
    // Logic to delete user account based on session or token
    // This example needs session management or token-based authentication
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
