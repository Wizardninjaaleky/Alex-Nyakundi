const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Basic route for projects
app.get('/api/projects', (req, res) => {
    res.json({ message: 'List of projects will be here.' });
});

// Basic route for blog posts
app.get('/api/blog', (req, res) => {
    res.json({ message: 'List of blog posts will be here.' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
