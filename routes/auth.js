const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login sayfasını göster
router.get('/login', (req, res) => {
    if (req.session.isAuthenticated) {
        return res.redirect('/dashboard');
    }
    res.render('auth/login', { error: null });
});

// Login işlemi
router.post('/login', authController.login);

// Logout işlemi
router.get('/logout', authController.logout);

module.exports = router;
