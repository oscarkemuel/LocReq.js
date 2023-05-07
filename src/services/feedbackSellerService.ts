import { ICreateFeedbackSellerDTO } from "../dtos/ICreateFeedbackSellerDTO";
import { FeedbackSellerRepository } from "../repositories/FeedbackSellerRepository";
import { CustomersService } from "./customersService";
import { SellersService } from "./sellersService";

class FeedbackSellerService {
  private feedbackSellerRepository = new FeedbackSellerRepository();
  private customerService = new CustomersService();
  private sellerService = new SellersService();

  async create(userId: string, data: Omit<ICreateFeedbackSellerDTO, 'customerId'>) {
    const customer = await this.customerService.getByUserId(userId);
    const seller = await this.sellerService.showById(data.sellerId);

    const feedback = await this.feedbackSellerRepository.create({
      ...data,
      customerId: customer.id,
      sellerId: seller.id
    });

    return feedback;
  }
}

export { FeedbackSellerService }