const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../controllers/authController');

// Login sayfasını göster
router.get('/login', (req, res) => {
    // JWT token kontrolü
    const token = req.cookies.authToken;
    if (token) {
        try {
            const jwt = require('jsonwebtoken');
            const JWT_SECRET = process.env.JWT_SECRET || 'thresh-project-jwt-secret-key-2024';
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
