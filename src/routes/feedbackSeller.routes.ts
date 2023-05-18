import { Router } from 'express'
import { FeedbackSellerController } from '../controllers/feedbackSellerController';

const feedbackSellerRouter = Router()
const feedbackSellerController = new FeedbackSellerController();

feedbackSellerRouter.post('/', (request, response) => {
  return feedbackSellerController.create(request, response)
})

export { feedbackSellerRouter }