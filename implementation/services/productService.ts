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

    const product = await this.productRepository.create({...data,  available: true });

    return product;
  }

  async validateNewProduct(product: ICreateProductDTO) {
    // 6'0 X 19 X 2 7/16 X 29L
    // ["6'0", '19', '2 7/16', '29L']
    const attributes = product.name.trim().split(" X ");
  
    if (attributes.length !== 4) {
      throw new BadRequestError("Product must have 4 attributes. Ex: 6'0 X 19 X 2 7/16 X 29L");
    }
  
    // regex patterns for the attributes
    const patterns = [
      /^\d+'?\d*$/, // length in feet and inches (ex. 6'0)
      /^\d+$/, // width in inches (ex. 19)
      /^\d+ \d+\/\d+$/, // thickness in inches and fractions of an inch (ex. 2 7/16)
      /^\d+L$/ // volume in liters (ex. 29l)
    ];
  
    // validate each attribute
    for (let i = 0; i < attributes.length; i++) {
      if (!patterns[i].test(attributes[i])) {
        throw new BadRequestError(`Attribute ${i + 1} is invalid`);
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
      model: data.model,
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
      model: product.model,
      sellerId: product.sellerId,
      available: available,
    };

    const newProduct = await this.productRepository.update(
      id,
      productPayload
    )

    return newProduct;
  }
}

export { ProductService };
