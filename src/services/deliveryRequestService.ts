import { ICreateDeliveryRequestDTO } from "../dtos/ICreateDeliveryRequestDTO";
import { BadRequestError, NotFoundError } from "../helpers/apiErros";
import { DeliveryRequestRepository } from "../repositories/DeliveryRequestRepository";
import { CustomersService } from "./customersService";
import { PlaceService } from "./placeService";
import { ProductService } from "./productService";

class DeliveryRequestService {
  private deliveryRequestRepository = new DeliveryRequestRepository();
  private placeService = new PlaceService();
  private productService = new ProductService();
  private customerService = new CustomersService();

  async create(data: ICreateDeliveryRequestDTO) {
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

  async showByCustomerId(customerId: string) {
    const deliveryRequests = await this.deliveryRequestRepository.showByCustomerId(customerId);

    return deliveryRequests;
  }

  async showBySellerId(sellerId: string) {
    const deliveryRequests = await this.deliveryRequestRepository.showBySellerId(sellerId);

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
}

export { DeliveryRequestService }