import { Request, Response } from 'express';
import { CustomersService } from '../services/customersService';
import { DeliveryRequestService } from '../services/deliveryRequestService';

class DeliveryRequestController {
  private deliveryRequestService = new DeliveryRequestService();

  async create(req: Request, res: Response) {
    const { placeId, productId, quantity } = req.body;

    const deliveryRequest = await this.deliveryRequestService.create({
      customerId: req.user.id,
      placeId,
      productId,
      quantity,
      delivery_time: new Date(),
      sellerId: '',
      status: ''
    });

    return res.status(201).json({ deliveryRequest });
  }


  async showByCustomer(req: Request, res: Response) {
    const deliveryRequests = await this.deliveryRequestService.showByCustomer(req.user.id);

    return res.status(200).json({ deliveryRequests });
  }

}

export { DeliveryRequestController }
