import { Router } from 'express'
import authMiddleware from '../middlewares/auth';
import { PlaceController } from '../controllers/placeController';

const placesRouter = Router()
const placeController = new PlaceController();

placesRouter.post('/', authMiddleware, (request, response) => {
  return placeController.create(request, response)
})

placesRouter.get('/', authMiddleware, (request, response) => {
  return placeController.index(request, response)
})

placesRouter.get('/:placeId', authMiddleware, (request, response) => {
  return placeController.show(request, response)
})

placesRouter.delete('/:placeId', authMiddleware, (request, response) => {
  return placeController.destroy(request, response)
})

placesRouter.put('/:placeId', authMiddleware, (request, response) => {
  return placeController.update(request, response)
})

export { placesRouter }