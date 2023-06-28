import { Request, Response } from 'express';
import { DeliveryRequestService } from '../../services/deliveryRequestService';
import { validateSchema } from '../../validations';
import { createDeliveryRequestSchema } from '../../validations/DeliveryRequest/createDeliveryRequest';
import { updateDeliveryRequestStatusSchema } from '../../validations/DeliveryRequest/updateDeliveryRequestStatus';
import { showByStatusBySellerIdSchema } from '../../validations/DeliveryRequest/showByStatusBySellerId';

abstract class RequestControllerAbstract {
  public deliveryRequestService = new DeliveryRequestService();

  abstract updateStatus(req: Request, res: Response): Promise<Response>;
  abstract cancel(req: Request, res: Response): Promise<Response>;

  async create(req: Request, res: Response) {
    const { body: payload }= await validateSchema(createDeliveryRequestSchema, req);

    const deliveryRequest = await this.deliveryRequestService.create({
      customerId: req.user.id,
      ... payload
    });

    return res.status(201).json({ deliveryRequest });
  }

  async showByCustomer(req: Request, res: Response) {
    const deliveryRequests = await this.deliveryRequestService.showByCustomer(req.user.id);

    return res.status(200).json({ deliveryRequests });
  }

  async showBySeller(req: Request, res: Response) {
    const { id: userId } = req.user;

    const deliveryRequests = await this.deliveryRequestService.showBySellerId(userId);

    return res.status(200).json({ deliveryRequests });
  }

  // async updateStatus(req: Request, res: Response) {
  //   const { body: { status }, params: { deliveryRequestId } } = 
  //     await validateSchema(updateDeliveryRequestStatusSchema, req);
  //   const { id: userId } = req.user;

  //   const deliveryRequest = await this.deliveryRequestService.updateStatus(userId, deliveryRequestId, status);

  //   return res.status(200).json({ deliveryRequest });
  // }

  async showByStatusBySellerId(req: Request, res: Response) {
    const { id: userId } = req.user;
    const { params: {status} } = await validateSchema(showByStatusBySellerIdSchema, req);

    const deliveryRequests = await this.deliveryRequestService.showByStatusBySellerId(userId, status);

    return res.status(200).json({ deliveryRequests });
  }

  async showByPlaceId(req: Request, res: Response) {
    const { placeId } = req.params;

    const deliveryRequests = await this.deliveryRequestService.showByPlaceId(placeId);

    return res.status(200).json({ deliveryRequests });
  }
  
  // async cancel(req: Request, res: Response) {
  //   const { id: userId } = req.user;
  //   const { deliveryRequestId } = req.params;

  //   const deliveryRequest = await this.deliveryRequestService.cancel(userId, deliveryRequestId);

  //   return res.status(200).json({ deliveryRequest });
  // }
}

export { RequestControllerAbstract }
