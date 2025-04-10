import express from 'express';
import sqlInjectionController from '../controllers/sqlInjectionController.js';

const router = express.Router();

// SQL Injection test route'ları
router.post('/unsafe', sqlInjectionController.unsafeQuery);
router.post('/safe', sqlInjectionController.safeQuery);
router.post('/execute', sqlInjectionController.executeQuery);

export default router; 