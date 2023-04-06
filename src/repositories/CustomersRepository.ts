import { Customer, CustomerPlace } from "@prisma/client";
import { prismaClient } from "../database";
import { ICustomersRepository } from "./ICostumersRepository";

class CustomersRepository implements ICustomersRepository {
  private repository;
  private placeRepository;

  constructor() {
    this.repository = prismaClient.customer;
    this.placeRepository = prismaClient.customerPlace;
  }

  async create(data: ICreateCustomerDTO): Promise<Customer> {
    const customer = await this.repository.create({
      data
    });

    return customer;
  }

  async findByPhone(phone: string): Promise<Customer | null> {
    const customer = await this.repository.findFirst({
      where: {
        phone
      }
    });

    return customer;
  }

  async createPlace(addressId: string, customerId: string, name: string): Promise<CustomerPlace> {
    const place = await this.placeRepository.create({
      data: {
        addressId,
        customerId,
        name,
      }
    });

    return place;
  }

  async showPlaces(customerId: string): Promise<CustomerPlace[]> {
    const places = await this.placeRepository.findMany({
      where: {
        customerId
      },
      include: {
        customer: true,
        address: true
      }
    });

    
    return places;
  }
}

export { CustomersRepository };