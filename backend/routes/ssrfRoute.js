
import express from 'express'
import { ssrfControl } from '../controllers/ssrfController.js'

const router = express.Router()

router.post('/ssrfCheck', ssrfControl)



export default router