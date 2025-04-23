
import express from 'express'
import sqlTableController from '../controllers/sqlTableController.js'

const router = express.Router()

router.post('/create', sqlTableController.createInjection)
router.post('/delete', sqlTableController.deleteInjection)
router.get('/list', sqlTableController.listInjection)


export default router