import { Router } from 'express'
import { CustumersController } from '../controllers/costumersController';

const customersRouter = Router()
const customersController = new CustumersController();

customersRouter.post('/', (request, response) => {
  return customersController.create(request, response)
})

export { customersRouter }