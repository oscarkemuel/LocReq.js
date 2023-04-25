import { DeliveryRequest } from "@prisma/client";
import { ICreateDeliveryRequestDTO } from "../dtos/ICreateDeliveryRequestDTO";

interface IDeliveryRequestRepository {
  create(data: ICreateDeliveryRequestDTO): Promise<DeliveryRequest>;
  show(): Promise<DeliveryRequest[]>;
  showById(id: string): Promise<DeliveryRequest | null>;
  update(id: string, data: ICreateDeliveryRequestDTO): Promise<DeliveryRequest>;
  updateStatus(id: string, status: string): Promise<DeliveryRequest>;
  delete(id: string): Promise<void>;
  showBySellerId(sellerId: string): Promise<DeliveryRequest[]>;
  showByCustomerId(customerId: string): Promise<DeliveryRequest[]>;
  showByStatusBySellerId(sellerId: string, status: string): Promise<DeliveryRequest[]>;
  showByPlaceId(placeId: string, status: string): Promise<DeliveryRequest[]>;
}

export {IDeliveryRequestRepository}