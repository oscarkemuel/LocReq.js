import { Router } from 'express'
import authMiddleware from '../middlewares/auth';
import { CustumersController } from '../controllers/costumersController';

const customersRouter = Router()
const customersController = new CustumersController();

customersRouter.post('/', authMiddleware, (request, response) => {
  return customersController.create(request, response)
})

customersRouter.post('/delivery-request', authMiddleware, (request, response) => {
  return customersController.createDeliveryRequest(request, response)
})

customersRouter.get('/delivery-request/my-requests', authMiddleware, (request, response) => {
  return customersController.showMyDeliveryRequests(request, response)
})

export { customersRouter }