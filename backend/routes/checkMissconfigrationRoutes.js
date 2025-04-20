import express from 'express'

import {checkMissConfigration} from '../controllers/missconfigrationController.js'


const router = express.Router()


router.post('/check', checkMissConfigration)


export default  router