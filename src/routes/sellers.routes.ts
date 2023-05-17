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

sellersRouter.get('/:sellerId/products', (request, response) => {
  return sellersController.showProductsBySellerId(request, response)
})

export { sellersRouter }