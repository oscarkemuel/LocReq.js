import { ICreateProductDTO } from "../dtos/ICreateProductDTO";
import { NotFoundError } from "../helpers/apiErros";
import { ProductRepository } from "../repositories/ProductRepository";

class ProductService {
  private productRepository = new ProductRepository();

  async create(data: ICreateProductDTO) {
    const product = await this.productRepository.create(data);

    return product;
  }

  async show() {
    const products = await this.productRepository.show();

    return products;
  }

  async showById(id: string) {
    const product = await this.productRepository.showById(id);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product;
  }

  async update(id: string, data: ICreateProductDTO) {
    const product = await this.productRepository.showById(id);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    const newProduct = await this.productRepository.update(id, data);

    return newProduct;
  }

  async delete(id: string) {
    const product = await this.productRepository.showById(id);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    await this.productRepository.delete(id);
  }

  async showBySellerId(sellerId: string) {
    const products = await this.productRepository.showBySellerId(sellerId);

    return products;
  }
}

export { ProductService }