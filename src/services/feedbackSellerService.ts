import { ICreateFeedbackSellerDTO } from "../dtos/ICreateFeedbackSellerDTO";
import {  NotFoundError } from "../helpers/apiErros";
import { FeedbackSellerRepository } from "../repositories/FeedbackSellerRepository";
import { CustomersService } from "./customersService";
import { SellersService } from "./sellersService";

class FeedbackSellerService {
  private feedbackSellerRepository = new FeedbackSellerRepository();
  private customerService = new CustomersService();
  private sellerService = new SellersService();

  async create(userId: string, data: Omit<ICreateFeedbackSellerDTO, 'customerId'>) {
    const customer = await this.customerService.getByUserId(userId);

    if(!customer) {
      throw new NotFoundError('Customer not found');
    }

    const seller = await this.sellerService.showById(data.sellerId);

    if(!seller) {
      throw new NotFoundError('Seller not found');
    }

    const feedback = await this.feedbackSellerRepository.create({
      ...data,
      customerId: customer.id,
      sellerId: seller.id
    });

    return feedback;
  }
}

export { FeedbackSellerService }