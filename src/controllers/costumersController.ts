import { Request, Response } from 'express';
import { CustomersService } from '../services/customersService';
import { validateSchema } from '../validations';
import { createCustomerSchema } from '../validations/Customers/createCustomer';
import { SearchService } from '../../implementation/services/searchService';

class CustumersController {
  private custumersService = new CustomersService();
  private searchService = new SearchService();

  async create(req: Request, res: Response) {
    const { body: paylaod } = await validateSchema(createCustomerSchema, req);
    const user = req.user;

    const newCustomer = await this.custumersService.create({
      phone: paylaod.phone,
      userId: user.id
    });

    return res.status(201).json({ customer: newCustomer });
  }

  async searchSeller(req: Request, res: Response) {
    
  }
}

export { CustumersController };