import { BadRequestError } from "../helpers/apiErros";
import { CustomersRepository } from "../repositories/CustomersRepository";
import { AddressService } from "./addressService";

class CustomersService {
  private customerRepository = new CustomersRepository();
  private addressService = new AddressService();

  async create(data: ICreateCustomerDTO) {
    const customerAlreadyExists = await this.customerRepository.findByPhone(data.phone);
    
    if (customerAlreadyExists) {
      throw new BadRequestError('Customer already exists');
    }
    
    const newCustomer = await this.customerRepository.create(data);
  
    return newCustomer;
  }

  async createPlace(data: ICreatePlaceDTO) {
    const {id: addressId} = await this.addressService.create(data.address);

    const place = await this.customerRepository.createPlace(addressId, '', data.name);
  
    return place;
  }

  async showPlaces(customerId: string) {
    const places = await this.customerRepository.showPlaces(customerId);
  
    return places;
  }
}

export { CustomersService };