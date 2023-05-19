import { Favorite } from "@prisma/client";
import { IFavoriteRepository } from "./IFavoriteRepository";
import { prismaClient } from "../database";

class FavoriteRepository implements IFavoriteRepository {
  private repository;

  constructor() {
    this.repository = prismaClient.favorite;
  }

  async create(data: ICreateFavoriteDTO): Promise<Favorite> {
    const favorite = await this.repository.create({
      data
    });

    return favorite;
  }

  async getMyFavorites(customerId: string): Promise<Favorite[]> {
    const favorites = await this.repository.findMany({
      where: {
        customerId
      },
      include: {
        seller: {
          include: {
            user: true
          }
        }
      }
    });

    return favorites;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({
      where: {
        id
      }
    });
  }

  async getById(id: string): Promise<Favorite | null> {
    const favorite = await this.repository.findUnique({
      where: {
        id
      }
    });

    return favorite;
  }
}

export { FavoriteRepository }