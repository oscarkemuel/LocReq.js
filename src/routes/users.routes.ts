import { Router } from 'express'
import { UserController } from '../controllers/usersController'

const usersRouter = Router()
const usersController = new UserController();

usersRouter.get('/', (request, response) => {
  return usersController.index(request, response)
})

usersRouter.post('/', (request, response) => {
  return usersController.create(request, response)
})

usersRouter.get('/:id', (request, response) => {
  return usersController.show(request, response)
})

export { usersRouter }