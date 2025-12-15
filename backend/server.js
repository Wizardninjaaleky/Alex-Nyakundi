const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')));
app.use('/admin', express.static(path.join(__dirname, 'public')));

// File upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '..', 'public', 'uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// Helper functions
const dataPath = path.join(__dirname, 'data.json');

const readData = () => {
    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data:', error);
        return null;
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing data:', error);
        return false;
    }
};

// Simple authentication middleware
const authenticate = (req, res, next) => {
    const { username, password } = req.body;
    
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        next();
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
};

// API Routes

// Get all data
app.get('/api/data', (req, res) => {
    const data = readData();
    if (data) {
        res.json(data);
    } else {
        res.status(500).json({ error: 'Failed to read data' });
    }
});

// Get profile
app.get('/api/profile', (req, res) => {
    const data = readData();
    if (data && data.profile) {
        res.json(data.profile);
    } else {
        res.status(500).json({ error: 'Failed to read profile' });
    }
});

// Update profile
app.post('/api/profile', authenticate, (req, res) => {
    const data = readData();
    if (!data) {
        return res.status(500).json({ error: 'Failed to read data' });
    }
    
    data.profile = { ...data.profile, ...req.body.profile };
    
    if (writeData(data)) {
        res.json({ message: 'Profile updated successfully', profile: data.profile });
    } else {
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

// Get services
app.get('/api/services', (req, res) => {
    const data = readData();
    if (data && data.services) {
        res.json(data.services);
    } else {
        res.status(500).json({ error: 'Failed to read services' });
    }
});

// Update services
app.post('/api/services', authenticate, (req, res) => {
    const data = readData();
    if (!data) {
        return res.status(500).json({ error: 'Failed to read data' });
    }
    
    data.services = req.body.services;
    
    if (writeData(data)) {
        res.json({ message: 'Services updated successfully', services: data.services });
    } else {
        res.status(500).json({ error: 'Failed to update services' });
    }
});

// Get portfolio items
app.get('/api/portfolio', (req, res) => {
    const data = readData();
    if (data && data.portfolio) {
        res.json(data.portfolio);
    } else {
        res.status(500).json({ error: 'Failed to read portfolio' });
    }
});

// Add portfolio item
app.post('/api/portfolio', authenticate, (req, res) => {
    const data = readData();
    if (!data) {
        return res.status(500).json({ error: 'Failed to read data' });
    }
    
    const newItem = {
        id: Date.now(),
        ...req.body.item
    };
    
    data.portfolio.push(newItem);
    
    if (writeData(data)) {
        res.json({ message: 'Portfolio item added successfully', item: newItem });
    } else {
        res.status(500).json({ error: 'Failed to add portfolio item' });
    }
});

// Update portfolio item
app.put('/api/portfolio/:id', authenticate, (req, res) => {
    const data = readData();
    if (!data) {
        return res.status(500).json({ error: 'Failed to read data' });
    }
    
    const itemId = parseInt(req.params.id);
    const index = data.portfolio.findIndex(item => item.id === itemId);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Portfolio item not found' });
    }
    
    data.portfolio[index] = { ...data.portfolio[index], ...req.body.item };
    
    if (writeData(data)) {
        res.json({ message: 'Portfolio item updated successfully', item: data.portfolio[index] });
    } else {
        res.status(500).json({ error: 'Failed to update portfolio item' });
    }
});

// Delete portfolio item
app.delete('/api/portfolio/:id', authenticate, (req, res) => {
    const data = readData();
    if (!data) {
        return res.status(500).json({ error: 'Failed to read data' });
    }
    
    const itemId = parseInt(req.params.id);
    const index = data.portfolio.findIndex(item => item.id === itemId);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Portfolio item not found' });
    }
    
    data.portfolio.splice(index, 1);
    
    if (writeData(data)) {
        res.json({ message: 'Portfolio item deleted successfully' });
    } else {
        res.status(500).json({ error: 'Failed to delete portfolio item' });
    }
});

// Upload image
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({
        message: 'File uploaded successfully',
        url: fileUrl,
        filename: req.file.filename
    });
});

// Contact form submission
app.post('/api/contact', (req, res) => {
    const { name, email, service, message } = req.body;
    
    console.log('Contact Form Submission:', {
        name,
        email,
        service,
        message,
        timestamp: new Date().toISOString()
    });
    
    // Here you can add email sending functionality or save to database
    
    res.json({ message: 'Message received successfully' });
});

// Service request submission
app.post('/api/service-request', (req, res) => {
    const { serviceType, clientName, clientEmail, clientPhone, projectTimeline, projectDetails } = req.body;
    
    console.log('Service Request:', {
        serviceType,
        clientName,
        clientEmail,
        clientPhone,
        projectTimeline,
        projectDetails,
        timestamp: new Date().toISOString()
    });
    
    // Here you can add email sending functionality or save to database
    
    res.json({ message: 'Service request received successfully' });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Admin panel: http://localhost:${PORT}/admin`);
    console.log(`📡 API endpoint: http://localhost:${PORT}/api`);
});
