import { Router } from 'express'
import { PlaceController } from '../controllers/placeController';

const placesRouter = Router()
const placeController = new PlaceController();

placesRouter.post('/', (request, response) => {
  return placeController.create(request, response)
})

placesRouter.get('/', (request, response) => {
  return placeController.index(request, response)
})

placesRouter.get('/:placeId', (request, response) => {
  return placeController.show(request, response)
})

placesRouter.delete('/:placeId', (request, response) => {
  return placeController.destroy(request, response)
})

placesRouter.put('/:placeId', (request, response) => {
  return placeController.update(request, response)
})

export { placesRouter }