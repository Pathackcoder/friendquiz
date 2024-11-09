// Required modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Include path module

// Initialize express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data from forms

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection string (replace with your details)
const MONGODB_URI = 'mongodb+srv://ap315605:Amit%40123@cluster0.8wilj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection error:", err));

// Define User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

// Create User model
const User = mongoose.model('User', userSchema);

// API endpoint to register a new user
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const newUser = new User({ username, password });
        await newUser.save();
        // Redirect to the desired URL after successful registration
        res.redirect('https://pathackcoder.github.io/newquiz/');
    } catch (error) {
        res.status(500).send("Error registering user: " + error.message);
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
