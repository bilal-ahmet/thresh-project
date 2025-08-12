const express = require('express');
const router = express.Router();
const truckController = require('../controllers/truckController');

// Middleware - Authentication kontrolü
const requireAuth = (req, res, next) => {
    console.log('Session data:', req.session);
    console.log('IsAuthenticated:', req.session.isAuthenticated);
    console.log('User:', req.session.user);
    
    if (!req.session.isAuthenticated || !req.session.user) {
        console.log('Authentication failed, redirecting to login');
        return res.redirect('/auth/login');
    }
    
    console.log('Authentication successful');
    next();
};

// Tüm route'larda authentication kontrolü
router.use(requireAuth);

// Ana dashboard sayfası
router.get('/', truckController.getAllTrucks);

// Kamyon detay sayfası
router.get('/truck/:id', truckController.getTruckDetails);

// Kamyon durumu güncelleme
router.post('/truck/:id/status', truckController.updateTruckStatusRoute);

module.exports = router; 