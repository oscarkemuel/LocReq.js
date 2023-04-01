import { Router } from 'express'
import { UserController } from '../controllers/usersController'
import authMiddleware from '../middlewares/auth';

const usersRouter = Router()
const usersController = new UserController();

usersRouter.post('/', (request, response) => {
  return usersController.create(request, response)
})

usersRouter.get('/:id', authMiddleware, (request, response) => {
  return usersController.show(request, response)
})

export { usersRouter }