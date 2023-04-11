import { Address } from "@prisma/client";

interface IAddressRepository {
  create(address: ICreateAddressDTO): Promise<Address>;
  delete(id: string): Promise<void>;
}

export { IAddressRepository };