import { isInteger } from "lodash";
import { ICreateProductDTO } from "../../src/dtos/ICreateProductDTO";
import { BadRequestError, NotFoundError } from "../../src/helpers/apiErros";
import { ProductRepository } from "../../src/repositories/ProductRepository";
import { ProductServiceAbstract } from "../../src/services/abstract/productServiceAbstract"
import { Product } from '@prisma/client';


class ProductService extends ProductServiceAbstract {
    //private productRepository = new ProductRepository();

    async create(data: ICreateProductDTO) {
        
        if (!this.validateNewProduct(data)) {
            throw new BadRequestError('Product not create. Validation error');
        } 

        const product = await this.productRepository.create(data);
        
        return product;
    }

    validateNewProduct (Product: ICreateProductDTO) {
        if (Product.quantity <= 0){
            return false
        }
        return true
    }

    async update(id: string, data: ICreateProductDTO) {
        const product = await this.productRepository.showById(id);
        
        if (!this.validateNewProduct(data)) {
            throw new BadRequestError('Product not create. Validation error');
        }
        
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

}

export { ProductService }