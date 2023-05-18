import { ICreateFeedbackSellerDTO } from "../dtos/ICreateFeedbackSellerDTO";
import { NotFoundError, UnauthorizedError } from "../helpers/apiErros";
import { FeedbackSellerRepository } from "../repositories/FeedbackSellerRepository";
import { CustomersService } from "./customersService";
import { SellersService } from "./sellersService";

class FeedbackSellerService {
  private feedbackSellerRepository = new FeedbackSellerRepository();
  private customerService = new CustomersService();
  private sellerService = new SellersService();

  async create(userId: string, data: Omit<ICreateFeedbackSellerDTO, 'customerId'>) {
    const customer = await this.customerService.getByUserId(userId);

    if (!customer) {
      throw new NotFoundError('Customer not found');
    }

    const seller = await this.sellerService.showById(data.sellerId);

    if (!seller) {
      throw new NotFoundError('Seller not found');
    }

    const feedback = await this.feedbackSellerRepository.create({
      ...data,
      customerId: customer.id,
      sellerId: seller.id
    });

    return feedback;
  }

  async showById(id: string) {
    const feedback = await this.feedbackSellerRepository.showById(id);

    if (!feedback) {
      throw new NotFoundError('Feedback not found');
    }

    return feedback;
  }

  async delete(id: string, userId: string) {
    const feedback = await this.feedbackSellerRepository.showById(id);

    if (!feedback) {
      throw new NotFoundError('Feedback not found');
    }

    if (feedback.customer.userId !== userId) {
      throw new UnauthorizedError('You are not allowed to delete this feedback');
    }

    await this.feedbackSellerRepository.delete(id);
  }

  async customerHasFeedback(userId: string, sellerId: string) {
    const customer = await this.customerService.getByUserId(userId);
    const seller = await this.sellerService.showById(sellerId);

    const feedbackSeller = await this.feedbackSellerRepository.customerHasFeedback(customer.id, seller.id);

    return feedbackSeller;
  }
}

export { FeedbackSellerService }