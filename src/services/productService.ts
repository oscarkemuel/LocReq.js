import { ICreateProductDTO } from "../dtos/ICreateProductDTO";
import { BadRequestError, NotFoundError } from "../helpers/apiErros";
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

    const productWithout_count = {
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      sellerId: data.sellerId
    }

    const newProduct = await this.productRepository.update(id, productWithout_count);

    return newProduct;
  }

  async delete(id: string) {
    const product = await this.productRepository.showById(id);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    if (product._count.DeliveryRequest > 0) {
      throw new BadRequestError('Product has delivery requests');
    }
    
    await this.productRepository.delete(id);
  }

  async showBySellerId(sellerId: string) {
    const products = await this.productRepository.showBySellerId(sellerId);

    return products;
  }

  async decrementQuantity(id: string, quantity: number) {
    const product = await this.productRepository.showById(id);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    if(product.quantity < quantity) {
      throw new NotFoundError('Insufficient quantity');
    }

    const newQuantity = product.quantity - quantity;

    const productWithout_count = {
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      sellerId: product.sellerId
    }

    const newProduct = await this.productRepository.update(id, { ...productWithout_count, quantity: newQuantity });

    return newProduct;
  }
}

export { ProductService }