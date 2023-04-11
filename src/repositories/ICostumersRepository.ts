import { Customer, CustomerPlace } from "@prisma/client";

interface ICustomersRepository {
  create(data: ICreateCustomerDTO): Promise<Customer>;
  findByUserId(userId: string): Promise<Customer | null>;
  findByPhone(phone: string): Promise<Customer | null>;
}

export { ICustomersRepository };