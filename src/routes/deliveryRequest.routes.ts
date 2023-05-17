import { Router } from 'express'
import { DeliveryRequestController } from '../controllers/deliveryRequestController';

const deliveryRequestRouter = Router()
const deliveryRequestController = new DeliveryRequestController();

// Customer
deliveryRequestRouter.post('/', (request, response) => {
  return deliveryRequestController.create(request, response)
})
deliveryRequestRouter.get('/my-requests', (request, response) => {
  return deliveryRequestController.showByCustomer(request, response)
})
deliveryRequestRouter.get('/place/:placeId', (request, response) => {
  return deliveryRequestController.showByPlaceId(request, response)
})
deliveryRequestRouter.put('/cancel/:deliveryRequestId', (request, response) => {
  return deliveryRequestController.cancel(request, response)
})

// Seller
deliveryRequestRouter.patch('/:deliveryRequestId/status', (request, response) => {
  return deliveryRequestController.updateStatus(request, response)
})
deliveryRequestRouter.get('/by-seller', (request, response) => {
  return deliveryRequestController.showBySeller(request, response)
})
deliveryRequestRouter.get('/by-seller/:status', (request, response) => {
  return deliveryRequestController.showByStatusBySellerId(request, response)
})

export { deliveryRequestRouter }