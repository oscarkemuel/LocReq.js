import { ICreateDeliveryRequestDTO } from "../dtos/ICreateDeliveryRequestDTO";
import { DeliveryRequestRepository } from "../repositories/DeliveryRequestRepository";

class DeliveryRequestService {
  private deliveryRequestRepository = new DeliveryRequestRepository();

  async create(data: ICreateDeliveryRequestDTO) {
    const deliveryRequest = await this.deliveryRequestRepository.create(data);

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
}

export { DeliveryRequestService }