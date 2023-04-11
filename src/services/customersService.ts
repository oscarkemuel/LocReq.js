import { ICreateDeliveryRequestDTO } from "../dtos/ICreateDeliveryRequestDTO";
import { BadRequestError, NotFoundError } from "../helpers/apiErros";
import { CustomersRepository } from "../repositories/CustomersRepository";
import { AddressService } from "./addressService";
import { DeliveryRequestService } from "./deliveryRequestService";
import { ProductService } from "./productService";

class CustomersService {
  private customerRepository = new CustomersRepository();
  private addressService = new AddressService();
  private productService = new ProductService();
  private deliveryRequestService = new DeliveryRequestService();

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

    if (!customer) {
      throw new NotFoundError('Customer not found');
    }

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

  async createDeliveryRequest(data: ICreateDeliveryRequestDTO) {
    const customer = await this.getByUserId(data.customerId);
    const place = await this.findPlace(data.placeId);
    const product = await this.productService.showById(data.productId);

    if (place.customerId !== customer.id) {
      throw new BadRequestError('Place does not belong to customer');
    }

    await this.productService.decrementQuantity(product.id, data.quantity);
    
    const payload = {
      status: 'pending',
      quantity: data.quantity,
      delivery_time: new Date(),
      sellerId: product.sellerId,
      productId: product.id,
      placeId: place.id,
      customerId: customer.id
    }
    
    const deliveryRequest = await this.deliveryRequestService.create(payload);


    return deliveryRequest;
  }

  async showMyDeliveryRequests(userId: string) {
    const customer = await this.getByUserId(userId);

    if (!customer) {
      throw new NotFoundError('Customer not found');
    }

    const deliveryRequests = await this.deliveryRequestService.showByCustomerId(customer.id);

    return deliveryRequests;
  }
}

export { CustomersService };