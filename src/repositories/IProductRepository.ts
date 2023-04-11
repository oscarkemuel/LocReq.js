import { Product } from "@prisma/client";
import { ICreateProductDTO } from "../dtos/ICreateProductDTO";

interface IProductRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  show(): Promise<Product[]>;
  showById(id: string): Promise<Product | null>;
  update(id: string, data: ICreateProductDTO): Promise<Product>;
  delete(id: string): Promise<void>;
  showBySellerId(sellerId: string): Promise<Product[]>;
}

export {IProductRepository}