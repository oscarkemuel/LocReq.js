import { Request } from "express";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../../src/helpers/apiErros";
import { RequestServiceAbstract } from "../../src/services/abstract/requestServiceAbstract";
import { UpdateRequestStatus } from "../../implementation/validations/DeliveryRequest/updateRequestStatus";
import { validateSchema } from "../../src/validations";
import { ICreateDeliveryRequestDTO } from "../../src/dtos/ICreateDeliveryRequestDTO";
import { ProductService } from "./productService";
import { PlaceService } from "../../src/services/placeService";

class RequestService extends RequestServiceAbstract {
  private updateRequestStatusSchema = new UpdateRequestStatus();
  private productService = new ProductService();
  private placeService = new PlaceService();
  async create(
    data: Omit<
      ICreateDeliveryRequestDTO,
      "delivery_time" | "status" | "sellerId"
    >
  ) {
    const customer = await this.customerService.getByUserId(data.customerId);
    const place = await this.placeService.show(data.placeId);
    const product = await this.productService.showById(data.productId);

    if (place.customerId !== customer.id) {
      throw new BadRequestError("Place does not belong to customer");
    }

    await this.productService.decrementQuantity(product.id, data.quantity);

    const payload = {
      status: "pending",
      quantity: data.quantity,
      delivery_time: new Date(),
      sellerId: product.sellerId,
      productId: product.id,
      placeId: place.id,
      customerId: customer.id,
    };

    const deliveryRequest = await this.deliveryRequestRepository.create(
      payload
    );

    return deliveryRequest;
  }

  async updateStatus(userId: string, req: Request) {
    const seller = await this.sellerService.getByUserId(userId);
    const schema = this.updateRequestStatusSchema.getSchema();

    const {
      body: { status },
      params: { requestId },
    } = await validateSchema(schema, req);

    const deliveryRequest = await this.deliveryRequestRepository.showById(
      requestId
    );

    if (!deliveryRequest) {
      throw new NotFoundError("Delivery request not found");
    }

    if (deliveryRequest.sellerId !== seller.id) {
      throw new UnauthorizedError(
        "You are not allowed to update this delivery request"
      );
    }

    // pending -> accepted -> rejected -> delivered

    if (status === deliveryRequest.status) {
      throw new BadRequestError("Delivery request already in this status");
    }

    if (deliveryRequest.status === "delivered") {
      throw new BadRequestError(
        "You are not allowed to deliver this delivery request"
      );
    }

    if (status === "accepted" && deliveryRequest.status !== "pending") {
      throw new BadRequestError(
        "You are not allowed to accept this delivery request"
      );
    }

    if (status === "rejected" && deliveryRequest.status !== "pending") {
      throw new BadRequestError(
        "You are not allowed to reject this delivery request"
      );
    }

    if (status === "delivered" && deliveryRequest.status !== "accepted") {
      throw new BadRequestError(
        "You are not allowed to deliver this delivery request"
      );
    }

    if (status === "pending") {
      throw new BadRequestError(
        "You are not allowed to return to pending"
      );
    }

    const newDeliveryRequest =
      await this.deliveryRequestRepository.updateStatus(requestId, status);

    return newDeliveryRequest;
  }

  async cancel(userId: string, id: string) {
    const deliveryRequest = await this.deliveryRequestRepository.showById(id);
    const customer = await this.customerService.getByUserId(userId);

    if (!deliveryRequest) {
      throw new NotFoundError("Delivery request not found");
    }

    if (deliveryRequest.customerId !== customer.id) {
      throw new UnauthorizedError(
        "You are not allowed to cancel this delivery request"
      );
    }

    if (deliveryRequest.status === "canceled") {
      throw new BadRequestError("Delivery request already canceled");
    }

    if (deliveryRequest.status !== "pending") {
      throw new BadRequestError(
        "You are not allowed to cancel this delivery request"
      );
    }

    await this.deliveryRequestRepository.updateStatus(id, "canceled");
  }
}

export { RequestService };
