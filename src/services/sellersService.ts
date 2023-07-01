import { BadRequestError, NotFoundError, UnauthorizedError } from "../helpers/apiErros";
import { SellersRepository } from "../repositories/SellersRepository";
import { AddressService } from "./addressService";
import { ProductService } from "../../implementation/services/productService";
import { Request } from "express";
import { validateSchema } from "../validations";
import { CreateProduct } from "../../implementation/validations/Product/createProduct";
import { UpdateProduct } from "../../implementation/validations/Product/updateProduct";

class SellersService {
  private sellersRepository = new SellersRepository();
  private addressService = new AddressService();
  private productService = new ProductService();

  private createProductSchema = new CreateProduct();
  private updateProductSchema = new UpdateProduct();

  async create(data: ICreateSellerDTO) {
    const sellerWithPhoneAlreadyExists = await this.sellersRepository.findByPhone(data.phone);
    const sellerWithUserIdAlreadyExists = await this.sellersRepository.findByUserId(data.userId);

    if (sellerWithPhoneAlreadyExists || sellerWithUserIdAlreadyExists) {
      throw new BadRequestError('Seller already exists');
    }

    const {id: addressId} = await this.addressService.create(data.address);

    const newSeller = await this.sellersRepository.create({
      addressId,
      phone: data.phone,
      userId: data.userId
    });

    return newSeller;
  }

  async showById(id: string) {
    const seller = await this.sellersRepository.showById(id);

    if (!seller) {
      throw new NotFoundError('Seller not found');
    }

    return seller;
  }

  async getMe(userId: string) {
    const seller = await this.sellersRepository.findByUserId(userId);

    if (!seller) {
      throw new NotFoundError('Seller not found');
    }

    return seller;
  }

  async getByUserId(userId: string) {
    const seller = await this.sellersRepository.findByUserId(userId);

    if (!seller) {
      throw new NotFoundError('Seller not found');
    }

    return seller;
  }

  async createProduct({ sellerId, req}: { sellerId: string, req: Request }) {
    const schema = this.createProductSchema.getSchema();
    const { body: payload } = await validateSchema(schema, req);

    const seller = await this.getByUserId(sellerId);

    if (!seller) {
      throw new NotFoundError('Seller not found');
    }

    const product = await this.productService.create({
      name: payload.name,
      description: payload.description,
      price: payload.price,
      quantity: payload.quantity,
      sellerId: seller.id
    });

    return product;
  }

  async showProductById(userId: string, productId: string) {
    const seller = await this.getByUserId(userId);

    if (!seller) {
      throw new NotFoundError('Seller not found');
    }

    const product = await this.productService.showById(productId);

    if (product.sellerId !== seller.id) {
      throw new UnauthorizedError('You can only access your own products');
    }

    return product;
  }

  async showProducts(userId: string) {
    const seller = await this.getByUserId(userId);

    if (!seller) {
      throw new NotFoundError('Seller not found');
    }

    const products = await this.productService.showBySellerId(seller.id);

    return products;
  }

  async updateProduct(userId: string, req: Request) {
    const schema = this.updateProductSchema.getSchema();
    const { body: payload, params: { productId } } = await validateSchema(schema, req);
    
    const seller = await this.getByUserId(userId);

    if (!seller) {
      throw new NotFoundError('Seller not found');
    }

    const product = await this.productService.showById(productId);

    if (product.sellerId !== seller.id) {
      throw new UnauthorizedError('You can only update your own products');
    }

    const newProduct = await this.productService.update(productId, {
      name: payload.name,
      description: payload.description,
      price: payload.price,
      quantity: payload.quantity,
      sellerId: seller.id
    });

    return newProduct;
  }

  async deleteProduct(userId: string, productId: string) {
    const seller = await this.getByUserId(userId);

    if (!seller) {
      throw new NotFoundError('Seller not found');
    }

    const product = await this.productService.showById(productId);

    if (product.sellerId !== seller.id) {
      throw new UnauthorizedError('You can only delete your own products');
    }

    await this.productService.delete(productId);
  }

  async showProductsBySellerId(sellerId: string) {
    const seller = await this.sellersRepository.showById(sellerId);

    if (!seller) {
      throw new NotFoundError('Seller not found');
    }

    const products = await this.productService.showBySellerId(sellerId);

    return products;
  }
}

export { SellersService }