import { Router } from 'express'
import { SellersController } from '../controllers/sellersController';
import authMiddleware from '../middlewares/auth';

const sellersRouter = Router()
const sellersController = new SellersController();

sellersRouter.post('/', authMiddleware, (request, response) => {
  return sellersController.create(request, response)
})

sellersRouter.post('/products', authMiddleware, (request, response) => {
  return sellersController.createProduct(request, response)
})

sellersRouter.get('/products', authMiddleware, (request, response) => {
  return sellersController.showProducts(request, response)
})

sellersRouter.get('/products/:productId', authMiddleware, (request, response) => {
  return sellersController.showProductById(request, response)
})

sellersRouter.put('/products/:productId', authMiddleware, (request, response) => {
  return sellersController.updateProduct(request, response)
})

sellersRouter.delete('/products/:productId', authMiddleware, (request, response) => {
  return sellersController.deleteProduct(request, response)
})

sellersRouter.get('/delivery-requests', authMiddleware, (request, response) => {
  return sellersController.showDeliveryRequests(request, response)
})


export { sellersRouter }