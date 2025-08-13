const express = require('express');
const router = express.Router();
const truckController = require('../controllers/truckController');
const { verifyToken } = require('../controllers/authController');

// Middleware - JWT Authentication kontrolü
const requireAuth = (req, res, next) => {
    console.log('Checking JWT authentication...');
    
    // verifyToken middleware'ini kullan
    verifyToken(req, res, next);
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