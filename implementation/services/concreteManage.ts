import { NotFoundError } from "../../src/helpers/apiErros";
import { ProductManageTemplate } from "../../src/services/abstract/productManageTemplate";

class ConcreteManage extends ProductManageTemplate {
  preCheckProduct(product: any, quantity?: number) {
    if (product.hasOwnProperty("quantity") && quantity !== undefined) {
      if (product.quantity < quantity) {
        throw new NotFoundError("Insufficient quantity");
      }
    }
  }
  manageAction(product: any, quantity?: number) {
    if (product.hasOwnProperty("quantity") && quantity !== undefined) {
      const newQuantity = product.quantity - quantity;

      const new_product = {
        ...product,
        quantity: newQuantity,
      };
      return new_product;
    } else {
      throw new NotFoundError("Product does not have quantity");
    }
  }
}

export { ConcreteManage };
