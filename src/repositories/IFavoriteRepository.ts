import { Favorite } from "@prisma/client";

interface IFavoriteRepository {
  create(data: ICreateFavoriteDTO): Promise<Favorite>;
  getMyFavorites(customerId: string): Promise<Favorite[]>;
}

export { IFavoriteRepository };