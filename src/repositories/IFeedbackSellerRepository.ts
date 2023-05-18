import { FeedbackSeller } from "@prisma/client";
import { ICreateFeedbackSellerDTO } from "../dtos/ICreateFeedbackSellerDTO";

interface IFeedbackSellerRepository {
  showById(id: string): Promise<FeedbackSeller | null>;
  create(data: ICreateFeedbackSellerDTO): Promise<FeedbackSeller>;
  delete(id: string): Promise<void>;
  customerHasFeedback(customerId: string, sellerId: string): Promise<boolean>;
}

export {IFeedbackSellerRepository}