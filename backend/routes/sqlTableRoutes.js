
import express from 'express'
import sqlTableController from '../controllers/sqlTableController.js'

const router = express.Router()

router.post('/create', sqlTableController.createInjection)



export default router