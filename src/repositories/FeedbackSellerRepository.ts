import { Customer, FeedbackSeller, User } from "@prisma/client";
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

  async showById(id: string): Promise<(FeedbackSeller & {
    customer: Customer & {
      user: User;
    };
  }) | null> {
    const feedbackSeller = await this.repository.findUnique({
      where: {
        id
      },
      include: {
        customer: {
          include: {
            user: true
          }
        }
      }
    });

    return feedbackSeller;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({
      where: {
        id
      },
    });
  }

  async customerHasFeedback(customerId: string, sellerId: string): Promise<boolean> {
    const feedbackSeller = await this.repository.findFirst({
      where: {
        customerId,
        sellerId
      }
    });

    return !!feedbackSeller;
  }
}

export { FeedbackSellerRepository }