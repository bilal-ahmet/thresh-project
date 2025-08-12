const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({
    secret: 'garbage-truck-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 24 saat
    }
}));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Routes
try {
    const authRoutes = require('./routes/auth');
    const dashboardRoutes = require('./routes/dashboard');

    app.use('/auth', authRoutes);
    app.use('/dashboard', dashboardRoutes);
    console.log('Routes loaded successfully');
} catch (error) {
    console.error('Error loading routes:', error.message);
    console.error('Stack:', error.stack);
}

// Test route
app.get('/test', (req, res) => {
    console.log('Test route accessed');
    res.send('Test route is working!');
});

// Ana sayfa - login'e yönlendir
app.get('/', (req, res) => {
    console.log('Root route accessed');
    try {
        if (req.session.isAuthenticated) {
            console.log('User authenticated, redirecting to dashboard');
            res.redirect('/dashboard');
        } else {
            console.log('User not authenticated, redirecting to login');
            res.redirect('/auth/login');
        }
    } catch (error) {
        console.error('Error in root route:', error.message);
        res.status(500).send('Error in root route');
    }
});

// 404 handler
app.use((req, res) => {
    console.log('404 - Page not found:', req.url);
    res.status(404).send('Page not found');
});

// Error handling middleware (en sonda olmalı)
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    console.error('Stack:', err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}`);
});

// Global error handler
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err.message);
    console.error('Stack:', err.stack);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
