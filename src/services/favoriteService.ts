import { BadRequestError, NotFoundError, UnauthorizedError } from "../helpers/apiErros";
import { FavoriteRepository } from "../repositories/FavoriteRepository";
import { CustomersService } from "./customersService";
import { SellersService } from "./sellersService";

class FavoriteService {
  private favoriteRepository = new FavoriteRepository();
  private customerService = new CustomersService();
  private sellerService = new SellersService();

  async create(userId: string, sellerId: string) {
    const customer = await this.customerService.getByUserId(userId);
    const seller = await this.sellerService.showById(sellerId);

    const data = {
      customerId: customer.id,
      sellerId: seller.id
    };

    const favorite = await this.favoriteRepository.create(data);

    return favorite;
  }

  async getMyFavorites(userId: string) {
    const customer = await this.customerService.getByUserId(userId);

    const favorites = await this.favoriteRepository.getMyFavorites(customer.id);

    return favorites;
  }

  async getById(id: string) {
    const favorite = await this.favoriteRepository.getById(id);

    if(!favorite) {
      throw new NotFoundError('Favorite not found');
    }

    return favorite;
  }

  async delete(userId: string, id: string) {
    const customer = await this.customerService.getByUserId(userId);
    const favorite = await this.getById(id);

    if(favorite.customerId !== customer.id) {
      throw new UnauthorizedError('You cannot delete a favorite that is not yours');
    }

    await this.favoriteRepository.delete(id);
  }
}

export { FavoriteService }