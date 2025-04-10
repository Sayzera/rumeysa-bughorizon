const express = require('express');
const router = express.Router();
const sqlInjectionController = require('../controllers/sqlInjectionController');

// SQL Injection test route'ları
router.post('/unsafe', sqlInjectionController.unsafeQuery);
router.post('/safe', sqlInjectionController.safeQuery);
router.post('/execute', sqlInjectionController.executeQuery);

module.exports = router; 