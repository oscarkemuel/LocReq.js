import { Request, Response } from 'express';
import { SellersService } from '../services/sellersService';

class SellersController {
  private sellersService = new SellersService();

  async create(req: Request, res: Response) {
    const { phone } = req.body;
    const user = req.user;

    const newSeller = await this.sellersService.create({phone, userId: user.id});

    return res.status(201).json({ seller: newSeller });
  }
}

export { SellersController }