import { DeliveryRequest } from "@prisma/client";
import { prismaClient } from "../database";
import { ICreateDeliveryRequestDTO } from "../dtos/ICreateDeliveryRequestDTO";
import { IDeliveryRequestRepository } from "./IDeliveryRequestRepository";

class DeliveryRequestRepository implements IDeliveryRequestRepository {
  private repository;

  constructor() {
    this.repository = prismaClient.deliveryRequest;
  }

  async create(data: ICreateDeliveryRequestDTO): Promise<DeliveryRequest> {
    const deliveryRequest = await this.repository.create({
      data
    });

    return deliveryRequest;
  }

  async show(): Promise<DeliveryRequest[]> {
    const deliveryRequests = await this.repository.findMany();

    return deliveryRequests;
  }

  async showById(id: string): Promise<DeliveryRequest | null> {
    const deliveryRequest = await this.repository.findUnique({
      where: {
        id
      }
    });

    return deliveryRequest;
  }

  async update(id: string, data: ICreateDeliveryRequestDTO): Promise<DeliveryRequest> {
    const deliveryRequest = await this.repository.update({
      where: {
        id
      },
      data
    });

    return deliveryRequest;
  }

  async updateStatus(id: string, status: string): Promise<DeliveryRequest> {
    const deliveryRequest = await this.repository.update({
      where: {
        id
      },
      data: {
        status
      }
    });

    return deliveryRequest;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({
      where: {
        id
      }
    });
  }

  async showBySellerId(sellerId: string): Promise<DeliveryRequest[]> {
    const deliveryRequests = await this.repository.findMany({
      where: {
        sellerId
      }
    });

    return deliveryRequests;
  }

  async showByCustomerId(customerId: string): Promise<DeliveryRequest[]> {
    const deliveryRequests = await this.repository.findMany({
      where: {
        customerId
      }
    });

    return deliveryRequests;
  }
}

export { DeliveryRequestRepository };