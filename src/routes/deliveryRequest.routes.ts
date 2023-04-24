import { Router } from 'express'
import { DeliveryRequestController } from '../controllers/deliveryRequestController';

const deliveryRequestRouter = Router()
const deliveryRequestController = new DeliveryRequestController();

deliveryRequestRouter.post('/', (request, response) => {
  return deliveryRequestController.create(request, response)
})

deliveryRequestRouter.patch('/:deliveryRequestId/status', (request, response) => {
  return deliveryRequestController.updateStatus(request, response)
})

deliveryRequestRouter.get('/my-requests', (request, response) => {
  return deliveryRequestController.showByCustomer(request, response)
})

deliveryRequestRouter.get('/by-seller', (request, response) => {
  return deliveryRequestController.showBySeller(request, response)
})

export { deliveryRequestRouter }