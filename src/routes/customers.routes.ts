import { Router } from 'express'
import authMiddleware from '../middlewares/auth';
import { CustumersController } from '../controllers/costumersController';

const customersRouter = Router()
const customersController = new CustumersController();

customersRouter.post('/', authMiddleware, (request, response) => {
  return customersController.create(request, response)
})

export { customersRouter }