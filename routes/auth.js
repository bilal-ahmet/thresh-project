const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authController = require('../controllers/authController');

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || 'thresh-project-jwt-secret-key-2024';

// Login sayfasını göster
router.get('/login', (req, res) => {
    // JWT token kontrolü
    const token = req.cookies.authToken;
    if (token) {
        try {
            jwt.verify(token, JWT_SECRET);
            // Token geçerliyse dashboard'a yönlendir
            return res.redirect('/dashboard');
        } catch (error) {
            // Token geçersizse cookie'yi temizle
            res.clearCookie('authToken');
        }
    }
    res.render('auth/login', { error: null });
});

// Login işlemi
router.post('/login', authController.login);

// Logout işlemi
router.get('/logout', authController.logout);

module.exports = router;
