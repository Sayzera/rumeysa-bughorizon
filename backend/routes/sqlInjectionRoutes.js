
import express from 'express'
import sqlInjectionController from '../controllers/sqlInjectionController.js'

const router = express.Router()

router.post('/unsafe', sqlInjectionController.unsafeQuery)
router.post('/safe', sqlInjectionController.safeQuery)


export default router