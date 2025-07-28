const express = require('express');
const router = express.Router();
const truckController = require('../controllers/truckController');

// Middleware - Authentication kontrolü
const requireAuth = (req, res, next) => {
    if (!req.session.isAuthenticated) {
        return res.redirect('/auth/login');
    }
    next();
};

// Tüm route'larda authentication kontrolü
router.use(requireAuth);

// Ana dashboard sayfası
router.get('/', truckController.getAllTrucks);

// Kamyon detay sayfası
router.get('/truck/:id', truckController.getTruckDetails);

module.exports = router; 