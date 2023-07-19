import { BadRequestError, NotFoundError } from "../../src/helpers/apiErros";
import { ProductRepository } from "../../src/repositories/ProductRepository";
import { ProductServiceAbstract } from "../../src/services/abstract/productServiceAbstract";
import { ICreateProductDTO } from "../dtos/ICreateProductDTO";
import { ConcreteManage } from "./concreteManage";

class ProductService extends ProductServiceAbstract {
  productRepository = new ProductRepository();
  productManage = new ConcreteManage();
  async create(data: ICreateProductDTO) {
    if (!(await this.validateNewProduct(data))) {
      throw new BadRequestError(
        "Product not create. Date colliding with existing one"
      );
    }
    if (data.startTime < new Date()) {
      throw new BadRequestError(
        "Product not create. This date has already passed"
      );
    }
    if (data.startTime >= data.endTime) {
      throw new BadRequestError(
        "Product not create. StartTime should be less than EndTime"
      );
    }

    const product = await this.productRepository.create({
      ...data,
      available: true,
    });

    return product;
  }

  async validateNewProduct(product: ICreateProductDTO) {
    const products = await this.productRepository.showBySellerId(
      product.sellerId
    );

    for (let i = 0; i < products.length; i++) {
      let existingProduct = products[i];
      if (
        product.startTime >= existingProduct.endTime! ||
        product.endTime <= existingProduct.startTime!
      ) {
        continue;
      } else {
        return false;
      }
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
      startTime: data.startTime,
      endTime: data.endTime,
      sellerId: data.sellerId,
    };

    const newProduct = await this.productRepository.update(
      id,
      productWithout_count
    );

    return newProduct;
  }

  async productIsAvailable(id: string) {
    const product = await this.productRepository.showById(id);

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    if (!product.available) {
      return false;
    }

    return true;
  }

  async updateAvailable(id: string, available: boolean) {
    const product = await this.productRepository.showById(id);

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    const productPayload = {
      name: product.name,
      description: product.description,
      price: product.price,
      startTime: product.startTime,
      endTime: product.endTime,
      sellerId: product.sellerId,
      available: available,
    };

    const newProduct = await this.productRepository.update(id, productPayload);

    return newProduct;
  }
}

export { ProductService };
