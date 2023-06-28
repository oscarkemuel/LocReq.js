import { Request, Response } from 'express';
import { validateSchema } from '../../validations';
import { createDeliveryRequestSchema } from '../../validations/DeliveryRequest/createDeliveryRequest';
import { showByStatusBySellerIdSchema } from '../../validations/DeliveryRequest/showByStatusBySellerId';
import { RequestService } from '../../../implementation/services/requestService';

abstract class RequestControllerAbstract {
  public requestService = new RequestService();

  abstract updateStatus(req: Request, res: Response): Promise<Response>;
  abstract cancel(req: Request, res: Response): Promise<Response>;

  async create(req: Request, res: Response) {
    const { body: payload }= await validateSchema(createDeliveryRequestSchema, req);

    const deliveryRequest = await this.requestService.create({
      customerId: req.user.id,
      ... payload
    });

    return res.status(201).json({ deliveryRequest });
  }

  async showByCustomer(req: Request, res: Response) {
    const deliveryRequests = await this.requestService.showByCustomer(req.user.id);

    return res.status(200).json({ deliveryRequests });
  }

  async showBySeller(req: Request, res: Response) {
    const { id: userId } = req.user;

    const deliveryRequests = await this.requestService.showBySellerId(userId);

    return res.status(200).json({ deliveryRequests });
  }

  async showByStatusBySellerId(req: Request, res: Response) {
    const { id: userId } = req.user;
    const { params: {status} } = await validateSchema(showByStatusBySellerIdSchema, req);

    const deliveryRequests = await this.requestService.showByStatusBySellerId(userId, status);

    return res.status(200).json({ deliveryRequests });
  }

  async showByPlaceId(req: Request, res: Response) {
    const { placeId } = req.params;

    const deliveryRequests = await this.requestService.showByPlaceId(placeId);

    return res.status(200).json({ deliveryRequests });
  }
}

export { RequestControllerAbstract }
