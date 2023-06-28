import { Request, Response } from 'express';
import { RequestControllerAbstract } from '../../src/controllers/abstract/requestControllerAbstract';
import { validateSchema } from '../../src/validations';
import { updateDeliveryRequestStatusSchema } from '../../src/validations/DeliveryRequest/updateDeliveryRequestStatus';

class RequestController extends RequestControllerAbstract {
  async updateStatus(req: Request, res: Response) {
    const { body: { status }, params: { deliveryRequestId } } = 
      await validateSchema(updateDeliveryRequestStatusSchema, req);
    const { id: userId } = req.user;

    const deliveryRequest = await this.deliveryRequestService.updateStatus(userId, deliveryRequestId, status);

    return res.status(200).json({ deliveryRequest });
  }


    async cancel(req: Request, res: Response) {
    const { id: userId } = req.user;
    const { deliveryRequestId } = req.params;

    const deliveryRequest = await this.deliveryRequestService.cancel(userId, deliveryRequestId);

    return res.status(200).json({ deliveryRequest });
  }
}

export { RequestController }