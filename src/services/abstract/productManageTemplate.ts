import { ProductRepository } from "../../repositories/ProductRepository";
import { NotFoundError } from "../../helpers/apiErros";
abstract class ProductManageTemplate {
  public productRepository = new ProductRepository();

  async templateMethod(id: string, quantity?: number) {
    const product = await this.productRepository.showById(id);

    if (!product) {
      throw new NotFoundError("Product not found");
    }
    this.preCheckProduct(product, quantity);
    const new_product = this.manageAction(product, quantity);
    const {_count, ...payload} = new_product;
    await this.productRepository.update(id, payload);
  }
  abstract preCheckProduct(product: any, quantity?: number): void;
  abstract manageAction(
    product: any,
    quantity?: number
  ): any;
}

export { ProductManageTemplate };
