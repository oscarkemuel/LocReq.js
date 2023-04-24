import { Router } from 'express'
import { SellersController } from '../controllers/sellersController';

const sellersRouter = Router()
const sellersController = new SellersController();

sellersRouter.post('/', (request, response) => {
  return sellersController.create(request, response)
})

sellersRouter.post('/products', (request, response) => {
  return sellersController.createProduct(request, response)
})

sellersRouter.get('/products', (request, response) => {
  return sellersController.showProducts(request, response)
})

sellersRouter.get('/products/:productId', (request, response) => {
  return sellersController.showProductById(request, response)
})

sellersRouter.put('/products/:productId', (request, response) => {
  return sellersController.updateProduct(request, response)
})

sellersRouter.delete('/products/:productId', (request, response) => {
  return sellersController.deleteProduct(request, response)
})


// delivery requests
sellersRouter.get('/delivery-requests', (request, response) => {
  return sellersController.showDeliveryRequests(request, response)
})

sellersRouter.patch('/delivery-requests/:deliveryRequestId/status', (request, response) => {
  return sellersController.updateDeliveryRequestStatus(request, response)
})

export { sellersRouter }