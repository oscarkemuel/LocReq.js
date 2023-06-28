import { Request, Response } from 'express';
import { SellersService } from '../services/sellersService';
import { validateSchema } from '../validations';
import { createSellerSchema } from '../validations/Seller/createSeller';
import { createProductSchema } from '../validations/Product/createProduct';
import { updateProductSchema } from '../validations/Product/updateProduct';
class SellersController {
  private sellersService = new SellersService();

  async create(req: Request, res: Response) {
    const { body: payload } = await validateSchema(createSellerSchema, req);
    const user = req.user;

    const newSeller = await this.sellersService.create({...payload, userId: user.id});

    return res.status(201).json({ seller: newSeller });
  }

  async showById(req: Request, res: Response) {
    const { sellerId } = req.params;

    const seller = await this.sellersService.showById(sellerId);

    return res.status(200).json({ seller });
  }

  async getMe(req: Request, res: Response) {
    const user = req.user;

    const seller = await this.sellersService.getMe(user.id);

    return res.status(200).json({ seller });
  }

  async createProduct(req: Request, res: Response) {
    const { body: payload } = await validateSchema(createProductSchema, req);
    const user = req.user;

    const newProduct = await this.sellersService.createProduct({ 
      sellerId: user.id, 
      ...payload 
    });

    return res.status(201).json({ product: newProduct });
  }

  async showProductById(req: Request, res: Response) {
    const { productId } = req.params;
    const user = req.user;

    const product = await this.sellersService.showProductById(user.id, productId);

    return res.status(200).json({ product });
  }

  async showProducts(req: Request, res: Response) {
    const user = req.user;

    const products = await this.sellersService.showProducts(user.id);

    return res.status(200).json({ products });
  }

  async updateProduct(req: Request, res: Response) {
    const { body: payload, params: { productId } } = await validateSchema(updateProductSchema, req);
    const user = req.user;
    
    const newProduct = await this.sellersService.updateProduct(user.id, productId, {
      ...payload,
      sellerId: user.id
    });

    return res.status(200).json({ product: newProduct });
  }

  async deleteProduct(req: Request, res: Response) {
    const { productId } = req.params;
    const user = req.user;

    await this.sellersService.deleteProduct(user.id, productId);

    return res.status(204).json();
  }

  async showProductsBySellerId(req: Request, res: Response) {
    const { sellerId } = req.params;

    const products = await this.sellersService.showProductsBySellerId(sellerId);

    return res.status(200).json({ products });
  }
}

export { SellersController }