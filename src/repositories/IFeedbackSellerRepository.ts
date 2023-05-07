import { FeedbackSeller } from "@prisma/client";
import { ICreateFeedbackSellerDTO } from "../dtos/ICreateFeedbackSellerDTO";

interface IFeedbackSellerRepository {
  create(data: ICreateFeedbackSellerDTO): Promise<FeedbackSeller>;
}

export {IFeedbackSellerRepository}