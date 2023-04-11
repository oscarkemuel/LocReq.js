import { BadRequestError } from "../helpers/apiErros";
import { SellersRepository } from "../repositories/SellersRepository";
import { AddressService } from "./addressService";

class SellersService {
  private sellersRepository = new SellersRepository();
  private addressService = new AddressService();

  async create(data: ICreateSellerDTO) {
    const sellerWithPhoneAlreadyExists = await this.sellersRepository.findByPhone(data.phone);
    const sellerWithUserIdAlreadyExists = await this.sellersRepository.findByUserId(data.userId);

    if (sellerWithPhoneAlreadyExists || sellerWithUserIdAlreadyExists) {
      throw new BadRequestError('Seller already exists');
    }

    const {id: addressId} = await this.addressService.create(data.address);

    const newSeller = await this.sellersRepository.create({
      addressId,
      phone: data.phone,
      userId: data.userId
    });

    return newSeller;
  }
}

export { SellersService }