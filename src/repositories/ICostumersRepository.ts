import { Customer, CustomerPlace } from "@prisma/client";

interface ICustomersRepository {
  create(data: ICreateCustomerDTO): Promise<Customer>;
  findByPhone(phone: string): Promise<Customer | null>;
  createPlace(addressId: string, customerId: string, name: string): Promise<CustomerPlace>;
  showPlaces(customerId: string): Promise<CustomerPlace[]>;
}

export { ICustomersRepository };