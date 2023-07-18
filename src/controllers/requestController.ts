import { Request, Response } from "express";
import { validateSchema } from "../validations";
import { showByStatusBySellerIdSchema } from "../validations/DeliveryRequest/showByStatusBySellerId";
import { RequestService } from "../../implementation/services/requestService";

class RequestController {
  public requestService = new RequestService();

  async updateStatus(req: Request, res: Response) {
    const { id: userId } = req.user;

    const deliveryRequest = await this.requestService.updateStatus(userId, req);

    return res.status(200).json({ deliveryRequest });
  }

  async cancel(req: Request, res: Response) {
    const { id: userId } = req.user;
    const { requestId } = req.params;

    const deliveryRequest = await this.requestService.cancel(userId, requestId);

    return res.status(200).json({ deliveryRequest });
  }

  async create(req: Request, res: Response) {
    const { id: userId } = req.user;

    const deliveryRequest = await this.requestService.create(userId, req);

    return res.status(201).json({ deliveryRequest });
  }

  async showByCustomer(req: Request, res: Response) {
    const deliveryRequests = await this.requestService.showByCustomer(
      req.user.id
    );

    return res.status(200).json({ deliveryRequests });
  }

  async showBySeller(req: Request, res: Response) {
    const { id: userId } = req.user;

    const deliveryRequests = await this.requestService.showBySellerId(userId);

    return res.status(200).json({ deliveryRequests });
  }

  async showByStatusBySellerId(req: Request, res: Response) {
    const { id: userId } = req.user;
    const {
      params: { status },
    } = await validateSchema(showByStatusBySellerIdSchema, req);

    const deliveryRequests = await this.requestService.showByStatusBySellerId(
      userId,
      status
    );

    return res.status(200).json({ deliveryRequests });
  }

  async showByPlaceId(req: Request, res: Response) {
    const { placeId } = req.params;

    const deliveryRequests = await this.requestService.showByPlaceId(placeId);

    return res.status(200).json({ deliveryRequests });
  }
}

export { RequestController };
