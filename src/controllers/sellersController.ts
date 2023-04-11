import { Request, Response } from 'express';
import { SellersService } from '../services/sellersService';
class SellersController {
  private sellersService = new SellersService();

  async create(req: Request, res: Response) {
    const { phone, address } = req.body;
    const user = req.user;

    const payload = {phone, userId: user.id, address}
    const newSeller = await this.sellersService.create(payload);

    return res.status(201).json({ seller: newSeller });
  }

  async createProduct(req: Request, res: Response) {
    const { name, description, price, quantity } = req.body;
    const user = req.user;

    const payload = {name, description, price, sellerId: user.id, quantity}
    const newProduct = await this.sellersService.createProduct(payload);

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
    const { productId } = req.params;
    const { name, description, price, quantity } = req.body;
    const user = req.user;
    

    const payload = {name, description, price, quantity, sellerId: user.id}

    const newProduct = await this.sellersService.updateProduct(user.id, productId, payload);

    return res.status(200).json({ product: newProduct });
  }

  async deleteProduct(req: Request, res: Response) {
    const { productId } = req.params;
    const user = req.user;

    await this.sellersService.deleteProduct(user.id, productId);

    return res.status(204).json();
  }
}

export { SellersController }