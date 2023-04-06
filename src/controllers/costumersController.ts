import { Request, Response } from 'express';
import { CustomersService } from '../services/customersService';

class CustumersController {
  private custumersService = new CustomersService();

  async create(req: Request, res: Response) {
    const { phone } = req.body;
    const user = req.user;

    const newCustomer = await this.custumersService.create({phone, userId: user.id});

    return res.status(201).json({ customer: newCustomer });
  }
}

export { CustumersController };