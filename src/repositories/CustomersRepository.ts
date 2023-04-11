import { Customer } from "@prisma/client";
import { prismaClient } from "../database";
import { ICustomersRepository } from "./ICostumersRepository";

class CustomersRepository implements ICustomersRepository {
  private repository;

  constructor() {
    this.repository = prismaClient.customer;
  }

  async create(data: ICreateCustomerDTO): Promise<Customer> {
    const customer = await this.repository.create({
      data
    });

    return customer;
  }

  async findByUserId(userId: string): Promise<Customer | null> {
    const customer = await this.repository.findFirst({
      where: {
        userId
      }
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
}

export { CustomersRepository };