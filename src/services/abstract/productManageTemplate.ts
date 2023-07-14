import { ProductRepository } from "../../repositories/ProductRepository";
import { NotFoundError } from "../../helpers/apiErros";
import { ICreateProductDTO } from "../../../implementation/dtos/ICreateProductDTO";
abstract class ProductManageTemplate {
  public productRepository = new ProductRepository();

  async templateMethod(id: string, quantity?: number) {
    const product = await this.productRepository.showById(id);

    if (!product) {
      throw new NotFoundError("Product not found");
    }
    this.preCheckProduct(product, quantity);
    const new_product = this.manageAction(product, quantity);
    await this.productRepository.update(id, new_product);
  }
  abstract preCheckProduct(product: ICreateProductDTO, quantity?: number): void;
  abstract manageAction(
    product: ICreateProductDTO,
    quantity?: number
  ): ICreateProductDTO;
}

export { ProductManageTemplate };
