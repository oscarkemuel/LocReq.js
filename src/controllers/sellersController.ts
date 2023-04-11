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
}

export { SellersController }