import { Router } from 'express'
import { SellersController } from '../controllers/sellersController';
import authMiddleware from '../middlewares/auth';

const sellersRouter = Router()
const sellersController = new SellersController();

sellersRouter.post('/', authMiddleware, (request, response) => {
  return sellersController.create(request, response)
})

export { sellersRouter }