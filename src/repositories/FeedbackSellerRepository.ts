import { FeedbackSeller } from "@prisma/client";
import { prismaClient } from "../database";
import { ICreateFeedbackSellerDTO } from "../dtos/ICreateFeedbackSellerDTO";
import { IFeedbackSellerRepository } from "./IFeedbackSellerRepository";

class FeedbackSellerRepository implements IFeedbackSellerRepository {
  private repository;

  constructor() {
    this.repository = prismaClient.feedbackSeller;
  }

  async create(data: ICreateFeedbackSellerDTO): Promise<FeedbackSeller> {
    const feedbackSeller = await this.repository.create({
      data
    });

    return feedbackSeller;
  }
}

export { FeedbackSellerRepository }