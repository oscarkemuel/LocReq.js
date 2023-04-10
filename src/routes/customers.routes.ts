import { Router } from 'express'
import authMiddleware from '../middlewares/auth';
import { CustumersController } from '../controllers/costumersController';

const customersRouter = Router()
const customersController = new CustumersController();

customersRouter.post('/', authMiddleware, (request, response) => {
  return customersController.create(request, response)
})

customersRouter.post('/place', authMiddleware, (request, response) => {
  return customersController.createPlace(request, response)
})

customersRouter.get('/place', authMiddleware, (request, response) => {
  return customersController.showPlaces(request, response)
})

customersRouter.get('/place/:placeId', authMiddleware, (request, response) => {
  return customersController.findPlace(request, response)
})

customersRouter.delete('/place/:placeId', authMiddleware, (request, response) => {
  return customersController.deletePlace(request, response)
})

customersRouter.put('/place/:placeId', authMiddleware, (request, response) => {
  return customersController.updatePlace(request, response)
})

export { customersRouter }