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

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const user = req.user;

    await this.feedbackSellerService.delete(id, user.id);

    return res.status(204).send();
  }

  async customerHasFeedback(req: Request, res: Response) {
    const { sellerId } = req.params;
    const user = req.user;

    const hasFeedback = await this.feedbackSellerService.customerHasFeedback(user.id, sellerId);

    return res.json({hasFeedback});
  }
}

export { FeedbackSellerController };