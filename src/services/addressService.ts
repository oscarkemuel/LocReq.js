import { NotFoundError } from "../helpers/apiErros";
import { AddressRepository } from "../repositories/AddressRepository";

class AddressService {
  private addressRepository;

  constructor() {
    this.addressRepository = new AddressRepository();
  }

  async create(address: ICreateAddressDTO) {
    const newAddress = await this.addressRepository.create(address);

    return newAddress;
  }

  async show(id: string) {
    const address = await this.addressRepository.show(id);

    if (!address) {
      throw new NotFoundError('Address not found');
    }

    return address;
  }

  async delete(id: string) {
    await this.addressRepository.delete(id);
  }

  async findByNeighborhoodWithSeller(neighborhood: string) {
    const addressesWithSellers = await this.addressRepository.findByNeighborhoodWithSeller(neighborhood);

    const sellers = addressesWithSellers.map(address => {
      return {
        address: {
          id: address.id,
          street: address.street,
          number: address.number,
          neighborhood: address.neighborhood,
          city: address.city,
          state: address.state,
          complement: address.complement,
          zipCode: address.zipCode,
        },

        seller: {
          id: address.Seller[0].id,
          name: address.Seller[0].user.name,
          email: address.Seller[0].user.email,
          phone: address.Seller[0].phone,
          favorities: address.Seller[0].Favorite.map(favorite =>
            favorite.customer.userId,
          )
        }
      }
    })

    return sellers;
  }
}

export { AddressService };