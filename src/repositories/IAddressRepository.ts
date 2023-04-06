import { Address } from "@prisma/client";

interface IAddressRepository {
  create(address: ICreateAddressDTO): Promise<Address>;
}

export { IAddressRepository };