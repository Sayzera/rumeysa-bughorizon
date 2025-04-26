
import express from 'express'
import CSRFController from '../controllers/csrfController.js'
import { csrfProtection } from '../middleware/csrf-protection.js'

const router = express.Router()



router.get('/get',  CSRFController.generateCsrf)

router.post('/secure-action', csrfProtection,  CSRFController.secureAction)
router.post('/not-secure-action',  CSRFController.notSecureAction)

export default router