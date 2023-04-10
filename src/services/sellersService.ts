import { BadRequestError } from "../helpers/apiErros";
import { SellersRepository } from "../repositories/SellersRepository";

class SellersService {
  private sellersRepository = new SellersRepository();

  async create(data: ICreateSellerDTO) {
    const sellerWithPhoneAlreadyExists = await this.sellersRepository.findByPhone(data.phone);
    const sellerWithUserIdAlreadyExists = await this.sellersRepository.findByUserId(data.userId);

    if (sellerWithPhoneAlreadyExists || sellerWithUserIdAlreadyExists) {
      throw new BadRequestError('Seller already exists');
    }

    const newSeller = await this.sellersRepository.create(data);

    return newSeller;
  }
}

export { SellersService }