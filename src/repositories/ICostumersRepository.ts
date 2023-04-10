import { Customer, CustomerPlace } from "@prisma/client";

interface ICustomersRepository {
  create(data: ICreateCustomerDTO): Promise<Customer>;
  findByUserId(userId: string): Promise<Customer | null>;
  findByPhone(phone: string): Promise<Customer | null>;

  // Places
  createPlace(addressId: string, userId: string, name: string): Promise<CustomerPlace>;
  showPlaces(customerId: string): Promise<CustomerPlace[]>;
  findPlaceById(placeId: string): Promise<CustomerPlace | null>;
  deletePlace(placeId: string): Promise<CustomerPlace>;
  updatePlace(placeId: string, name: string, addressId: string): Promise<CustomerPlace>;
}

export { ICustomersRepository };