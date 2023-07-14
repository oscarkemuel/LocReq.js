import { Request } from "express";
import { NotFoundError } from "../../helpers/apiErros";
import { DeliveryRequestRepository } from "../../repositories/DeliveryRequestRepository";
import { CustomersService } from "../customersService";
import { SellersService } from "../sellersService";
import { ICreateDeliveryRequestDTO } from "../../../implementation/dtos/ICreateDeliveryRequestDTO";

abstract class RequestServiceAbstract {
  public deliveryRequestRepository = new DeliveryRequestRepository();
  // private placeService = new PlaceService();
  // private productService = new ProductService();
  public customerService = new CustomersService();
  public sellerService = new SellersService();

  abstract updateStatus(userId: string, req: Request): Promise<any>;
  abstract cancel(userId: string, id: string): Promise<any>;
  abstract create(
    data: Omit<
      ICreateDeliveryRequestDTO,
      "delivery_time" | "status" | "sellerId"
    >
  ): Promise<any>;

  async showById(id: string) {
    const deliveryRequest = await this.deliveryRequestRepository.showById(id);

    if (!deliveryRequest) {
      throw new NotFoundError("Delivery request not found");
    }

    return deliveryRequest;
  }

  async showByCustomerId(customerId: string) {
    const deliveryRequests =
      await this.deliveryRequestRepository.showByCustomerId(customerId);

    return deliveryRequests;
  }

  async showBySellerId(userId: string) {
    const seller = await this.sellerService.getByUserId(userId);

    if (!seller) {
      throw new NotFoundError("Seller not found");
    }

    const deliveryRequests =
      await this.deliveryRequestRepository.showBySellerId(seller.id);

    return deliveryRequests;
  }

  async showByCustomer(userId: string) {
    const customer = await this.customerService.getByUserId(userId);

    if (!customer) {
      throw new NotFoundError("Customer not found");
    }

    const deliveryRequests = await this.showByCustomerId(customer.id);

    return deliveryRequests;
  }

  async showByStatusBySellerId(userId: string, status: string) {
    const seller = await this.sellerService.getByUserId(userId);

    if (!seller) {
      throw new NotFoundError("Seller not found");
    }

    const deliveryRequests =
      await this.deliveryRequestRepository.showByStatusBySellerId(
        seller.id,
        status
      );

    return deliveryRequests;
  }

  async showByPlaceId(placeId: string) {
    const deliveryRequests = await this.deliveryRequestRepository.showByPlaceId(
      placeId
    );

    return deliveryRequests;
  }
}

export { RequestServiceAbstract };
