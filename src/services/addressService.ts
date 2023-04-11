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

  async delete(id: string) {
    await this.addressRepository.delete(id);
  }
}

export { AddressService };