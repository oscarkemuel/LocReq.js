import { Address, Seller, User } from "@prisma/client";
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

  async show(id: string): Promise<Address | null> {
    const address = await this.repository.findUnique({
      where: {
        id
      }
    });

    return address;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({
      where: {
        id
      }
    });
  }

  async findByNeighborhoodWithSeller(neighborhood: string): Promise<(Address & {
    Seller: (Seller & {
        user: User;
    })[];
})[]> {
    const addresses = await this.repository.findMany({
      where: {
        neighborhood: {
          contains: neighborhood,
        },
        Seller: {
          some: {}
        }
      },
      include: {
        Seller: {
          include: {
            user: true
          }
        },
      }
    })

    return addresses;
  }
}

export { AddressRepository };