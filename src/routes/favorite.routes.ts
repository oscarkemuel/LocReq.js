import { Router } from 'express'
import { FavoriteController } from '../controllers/favoriteController';

const favoriteRouter = Router()
const favoriteController = new FavoriteController();

favoriteRouter.post('/', (request, response) => {
  return favoriteController.create(request, response)
})

favoriteRouter.get('/', (request, response) => {
  return favoriteController.getMyFavorites(request, response)
})

favoriteRouter.delete('/:id', (request, response) => {
  return favoriteController.delete(request, response)
})

export { favoriteRouter }