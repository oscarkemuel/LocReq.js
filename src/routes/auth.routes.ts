import { Router } from 'express'
import { AuthController } from '../controllers/authController';

const authRouter = Router()
const authController = new AuthController();

authRouter.post('/', (request, response) => {
  return authController.authenticate(request, response)
})

export { authRouter }