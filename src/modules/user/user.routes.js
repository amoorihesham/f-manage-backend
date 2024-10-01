import { Router } from 'express'
import * as userController from './user.controller.js'
import verifyUserToken from '../../middlewares/verifyUserToken.js'

const router = Router()

router.post('/auth', verifyUserToken, userController.register)

export default router
