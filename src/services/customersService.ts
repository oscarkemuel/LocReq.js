import { BadRequestError, NotFoundError } from "../helpers/apiErros";
import { CustomersRepository } from "../repositories/CustomersRepository";
import { AddressService } from "./addressService";

class CustomersService {
  private customerRepository = new CustomersRepository();
  private addressService = new AddressService();

  async create(data: ICreateCustomerDTO) {
    const customerWithPhoneAlreadyExists = await this.customerRepository.findByPhone(data.phone);
    const customerWithUserIdAlreadyExists = await this.customerRepository.findByUserId(data.userId);
    
    if (customerWithPhoneAlreadyExists || customerWithUserIdAlreadyExists) {
      throw new BadRequestError('Customer already exists');
    }
    
    const newCustomer = await this.customerRepository.create(data);
  
    return newCustomer;
  }

  async getByUserId(userId: string) {
    const customer = await this.customerRepository.findByUserId(userId);

    return customer;
  }

  async createPlace(data: ICreatePlaceDTO) {
    const costumer = await this.getByUserId(data.userId);

    if (!costumer) {
      throw new NotFoundError('Customer not found');
    }

    const {id: addressId} = await this.addressService.create(data.address);
    
    const place = await this.customerRepository.createPlace(addressId, costumer.id, data.name);
  
    return place;
  }

  async showPlaces(userId: string) {
    const costumer = await this.getByUserId(userId);

    if (!costumer) {
      throw new NotFoundError('Customer not found');
    }

    const places = await this.customerRepository.showPlaces(costumer.id);
  
    return places;
  }

  async findPlace(placeId: string) {
    const place = await this.customerRepository.findPlaceById(placeId);

    if (!place) {
      throw new NotFoundError('Place not found');
    }

    return place;
  }

  async deletePlace(placeId: string) {
    const place = await this.findPlace(placeId);
    
    if (!place) {
      throw new NotFoundError('Place not found');
    }

    const deletedPlace = await this.customerRepository.deletePlace(placeId);

    return deletedPlace;
  }

  async updatePlace(placeId: string, data: IUpdatePlaceDTO) {
    const place = await this.findPlace(placeId);
    
    if (!place) {
      throw new NotFoundError('Place not found');
    }

    const {id: addressId} = await this.addressService.create(data.address);

    const updatedPlace = await this.customerRepository.updatePlace(placeId, data.name, addressId);

    return updatedPlace;
  }
}

export { CustomersService };