import { Request, Response } from 'express';
import { DeliveryRequestService } from '../services/deliveryRequestService';
import { validateSchema } from '../validations';
import { createDeliveryRequestSchema } from '../validations/DeliveryRequest/createDeliveryRequest';

class DeliveryRequestController {
  private deliveryRequestService = new DeliveryRequestService();

  async create(req: Request, res: Response) {
    const { body: payload }= await validateSchema(createDeliveryRequestSchema, req);

    const deliveryRequest = await this.deliveryRequestService.create({
      customerId: req.user.id,
      delivery_time: new Date(),
      sellerId: '',
      status: '',
      ... payload
    });

    return res.status(201).json({ deliveryRequest });
  }


  async showByCustomer(req: Request, res: Response) {
    const deliveryRequests = await this.deliveryRequestService.showByCustomer(req.user.id);

    return res.status(200).json({ deliveryRequests });
  }

}

export { DeliveryRequestController }
