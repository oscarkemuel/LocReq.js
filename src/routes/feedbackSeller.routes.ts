import { Router } from 'express'
import { FeedbackSellerController } from '../controllers/feedbackSellerController';

const feedbackSellerRouter = Router()
const feedbackSellerController = new FeedbackSellerController();

feedbackSellerRouter.post('/', (request, response) => {
  return feedbackSellerController.create(request, response)
})

feedbackSellerRouter.delete('/:id', (request, response) => {
  return feedbackSellerController.delete(request, response)
})

feedbackSellerRouter.get('/customer-has-feedback/:sellerId', (request, response) => {
  return feedbackSellerController.customerHasFeedback(request, response)
})

export { feedbackSellerRouter }