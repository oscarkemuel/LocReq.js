import { promises } from "dns";
import { ICreateProductDTO } from "../../dtos/ICreateProductDTO";
import { BadRequestError, NotFoundError } from "../../helpers/apiErros";
import { ProductRepository } from "../../repositories/ProductRepository";

abstract class ProductServiceAbstract {
  public productRepository = new ProductRepository();

  abstract create(data: ICreateProductDTO):Promise<any>
  abstract validateNewProduct (Product:any):boolean
  abstract update(id: string, data: ICreateProductDTO):Promise<any>

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

export { ProductServiceAbstract }