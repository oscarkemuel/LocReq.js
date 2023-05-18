import { Request, Response } from 'express';
import { validateSchema } from '../validations';
import { FeedbackSellerService } from '../services/feedbackSellerService';
import { createFeedbackSeller } from '../validations/FeedbackSeller/createFeedbackSeller';

class FeedbackSellerController {
  private feedbackSellerService = new FeedbackSellerService();

  async create(req: Request, res: Response) {
    const { body: payload } = await validateSchema(createFeedbackSeller, req)
    const user = req.user;

    const feedbackSeller = await this.feedbackSellerService.create(user.id, payload);    

    return res.json({feedbackSeller});
  }
}

export { FeedbackSellerController };