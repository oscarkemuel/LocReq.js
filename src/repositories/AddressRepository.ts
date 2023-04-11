import { Address } from "@prisma/client";
import { prismaClient } from "../database";
import { IAddressRepository } from "./IAddressRepository";

class AddressRepository implements IAddressRepository {
  private repository;

  constructor() {
    this.repository = prismaClient.address;
  }

  async create(address: ICreateAddressDTO): Promise<Address> {
    const newAddress = await this.repository.create({
      data: address
    });

    return newAddress;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({
      where: {
        id
      }
    });
  }
}

export { AddressRepository };