import { ICreateProductDTO } from "../dtos/ICreateProductDTO";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../helpers/apiErros";
import { SellersRepository } from "../repositories/SellersRepository";
import { AddressService } from "./addressService";
import { ProductService } from "./productService";

class SellersService {
  private sellersRepository = new SellersRepository();
  private addressService = new AddressService();
  private productService = new ProductService();


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

  async getByUserId(userId: string) {
    const seller = await this.sellersRepository.findByUserId(userId);

    return seller;
  }

  async createProduct(data: ICreateProductDTO) {
    const seller = await this.getByUserId(data.sellerId);

    if (!seller) {
      throw new NotFoundError('Seller not found');
    }

    const product = await this.productService.create({
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
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

  async updateProduct(userId: string, productId: string, data: ICreateProductDTO) {
    const seller = await this.getByUserId(userId);

    if (!seller) {
      throw new NotFoundError('Seller not found');
    }

    const product = await this.productService.showById(productId);

    if (product.sellerId !== seller.id) {
      throw new UnauthorizedError('You can only update your own products');
    }

    const newProduct = await this.productService.update(productId, {
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
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
}

export { SellersService }