import { Router } from 'express'
import { DeliveryRequestController } from '../controllers/deliveryRequestController';

const deliveryRequestRouter = Router()
const deliveryRequestController = new DeliveryRequestController();

deliveryRequestRouter.post('/', (request, response) => {
  return deliveryRequestController.create(request, response)
})

deliveryRequestRouter.get('/my-requests', (request, response) => {
  return deliveryRequestController.showByCustomer(request, response)
})

export { deliveryRequestRouter }