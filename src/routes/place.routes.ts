import { Router } from 'express'
import authMiddleware from '../middlewares/auth';
import { CustumersController } from '../controllers/costumersController';

const placesRouter = Router()
const customersController = new CustumersController();

placesRouter.post('/', authMiddleware, (request, response) => {
  return customersController.createPlace(request, response)
})

placesRouter.get('/', authMiddleware, (request, response) => {
  return customersController.showPlaces(request, response)
})

placesRouter.get('/:placeId', authMiddleware, (request, response) => {
  return customersController.findPlace(request, response)
})

placesRouter.delete('/:placeId', authMiddleware, (request, response) => {
  return customersController.deletePlace(request, response)
})

placesRouter.put('/:placeId', authMiddleware, (request, response) => {
  return customersController.updatePlace(request, response)
})

export { placesRouter }