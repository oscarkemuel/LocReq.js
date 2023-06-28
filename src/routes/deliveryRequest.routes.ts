import { Router } from 'express'
import { RequestController } from '../../implementation/controllers/requestController';

const requestRouter = Router()
const requestController = new RequestController();

// Customer
requestRouter.post('/', (request, response) => {
  return requestController.create(request, response)
})
requestRouter.get('/my-requests', (request, response) => {
  return requestController.showByCustomer(request, response)
})
requestRouter.get('/place/:placeId', (request, response) => {
  return requestController.showByPlaceId(request, response)
})
requestRouter.put('/cancel/:requestId', (request, response) => {
  return requestController.cancel(request, response)
})

// Seller
requestRouter.patch('/:requestId/status', (request, response) => {
  return requestController.updateStatus(request, response)
})
requestRouter.get('/by-seller', (request, response) => {
  return requestController.showBySeller(request, response)
})
requestRouter.get('/by-seller/:status', (request, response) => {
  return requestController.showByStatusBySellerId(request, response)
})

export { requestRouter }