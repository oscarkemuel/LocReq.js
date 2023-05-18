import { ICreateDeliveryRequestDTO } from "../dtos/ICreateDeliveryRequestDTO";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../helpers/apiErros";
import { DeliveryRequestRepository } from "../repositories/DeliveryRequestRepository";
import { CustomersService } from "./customersService";
import { PlaceService } from "./placeService";
import { ProductService } from "./productService";
import { SellersService } from "./sellersService";

class DeliveryRequestService {
  private deliveryRequestRepository = new DeliveryRequestRepository();
  private placeService = new PlaceService();
  private productService = new ProductService();
  private customerService = new CustomersService();
  private sellerService = new SellersService();

  async create(data: Omit<ICreateDeliveryRequestDTO, 'delivery_time' | 'status' | 'sellerId'>) {
    const customer = await this.customerService.getByUserId(data.customerId);
    const place = await this.placeService.show(data.placeId);
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

    const deliveryRequest = await this.deliveryRequestRepository.create(payload);

    return deliveryRequest;
  }

  async showById(id: string) {
    const deliveryRequest = await this.deliveryRequestRepository.showById(id);

    if (!deliveryRequest) {
      throw new NotFoundError('Delivery request not found');
    }

    return deliveryRequest;
  }

  async updateStatus(userId: string, id: string, status: string) {
    const seller = await this.sellerService.getByUserId(userId);

    const deliveryRequest = await this.deliveryRequestRepository.showById(id);
    
    if (!deliveryRequest) {
      throw new NotFoundError('Delivery request not found');
    }

    if(deliveryRequest.sellerId !== seller.id) {
      throw new UnauthorizedError('You are not allowed to update this delivery request');
    }
    
    const newDeliveryRequest = await this.deliveryRequestRepository.updateStatus(id, status);

    return newDeliveryRequest;
  }

  async showByCustomerId(customerId: string) {
    const deliveryRequests = await this.deliveryRequestRepository.showByCustomerId(customerId);

    return deliveryRequests;
  }

  async showBySellerId(userId: string) {
    const seller = await this.sellerService.getByUserId(userId)

    if (!seller) {
      throw new NotFoundError('Seller not found');
    }
    
    const deliveryRequests = await this.deliveryRequestRepository.showBySellerId(seller.id);

    return deliveryRequests;
  }

  async showByCustomer(userId: string) {
    const customer = await this.customerService.getByUserId(userId);

    if (!customer) {
      throw new NotFoundError('Customer not found');
    }

    const deliveryRequests = await this.showByCustomerId(customer.id);

    return deliveryRequests;
  }

  async showByStatusBySellerId(userId: string, status: string) {
    const seller = await this.sellerService.getByUserId(userId);

    if (!seller) {
      throw new NotFoundError('Seller not found');
    }

    const deliveryRequests = await this.deliveryRequestRepository.showByStatusBySellerId(seller.id, status);

    return deliveryRequests;
  }

  async showByPlaceId(placeId: string) {
    const deliveryRequests = await this.deliveryRequestRepository.showByPlaceId(placeId);

    return deliveryRequests;
  }

  async cancel(userId: string, id: string) {
    const deliveryRequest = await this.deliveryRequestRepository.showById(id);
    const customer = await this.customerService.getByUserId(userId);

    if (!deliveryRequest) {
      throw new NotFoundError('Delivery request not found');
    }

    if (deliveryRequest.status === 'canceled') {
      throw new BadRequestError('Delivery request already canceled');
    }

    if(deliveryRequest.status !== 'pending') {
      throw new BadRequestError('You are not allowed to cancel this delivery request');
    }

    if (deliveryRequest.customerId !== customer.id) {
      throw new UnauthorizedError('You are not allowed to cancel this delivery request');
    }

    await this.deliveryRequestRepository.updateStatus(id, 'canceled');
  }
}

export { DeliveryRequestService }