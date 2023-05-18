import { Seller } from "@prisma/client";

interface ICreateSellerDTO {
  userId: string;
  phone: string;
  addressId: string;
}

interface ISellersRepository {
  create(data: ICreateSellerDTO): Promise<Seller>;
  showById(id: string): Promise<Seller | null>;
  findByPhone(phone: string): Promise<Seller | null>;
  findByUserId(userId: string): Promise<Seller | null>;
}

export { ISellersRepository, ICreateSellerDTO };