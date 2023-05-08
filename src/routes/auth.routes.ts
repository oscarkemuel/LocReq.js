import { Router } from 'express'
import { AuthController } from '../controllers/authController';
import authMiddleware from '../middlewares/auth';

const authRouter = Router()
const authController = new AuthController();

authRouter.post('/', (request, response) => {
  return authController.authenticate(request, response)
})

authRouter.get('/', authMiddleware, (request, response) => {
  return authController.getUserByToken(request, response)
})

export { authRouter }