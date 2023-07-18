import { BadRequestError, NotFoundError } from "../../src/helpers/apiErros";
import { ProductServiceAbstract } from "../../src/services/abstract/productServiceAbstract";
import { ICreateProductDTO } from "../dtos/ICreateProductDTO";
import { ConcreteManage } from "./concreteManage";

class ProductService extends ProductServiceAbstract {
  productManage = new ConcreteManage();
  async create(data: ICreateProductDTO) {
    if (!await this.validateNewProduct(data)) {
      throw new BadRequestError("Product not create. Validation error");
    }

    const product = await this.productRepository.create(data);

    return product;
  }

  async validateNewProduct(product: ICreateProductDTO) {
    const hasProduct = await this.productRepository.showByName(product.name)

    if (hasProduct) {
      return false;
    }

    return true;
  }

  async update(id: string, data: ICreateProductDTO) {
    const product = await this.productRepository.showById(id);

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    const productWithout_count = {
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      sellerId: data.sellerId,
    };

    const newProduct = await this.productRepository.update(
      id,
      productWithout_count
    );

    return newProduct;
  }
}

export { ProductService };
