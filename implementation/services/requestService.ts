import { BadRequestError, NotFoundError, UnauthorizedError } from "../../src/helpers/apiErros";
import { RequestServiceAbstract } from "../../src/services/abstract/requestServiceAbstract";

class RequestService extends RequestServiceAbstract {
  async updateStatus(userId: string, id: string, status: string) {
    const seller = await this.sellerService.getByUserId(userId);

    const deliveryRequest = await this.deliveryRequestRepository.showById(id);

    if (!deliveryRequest) {
      throw new NotFoundError('Delivery request not found');
    }

    if (deliveryRequest.sellerId !== seller.id) {
      throw new UnauthorizedError('You are not allowed to update this delivery request');
    }

    // pending -> accepted -> rejected -> delivered

    if(status === deliveryRequest.status) {
      throw new BadRequestError('Delivery request already in this status');
    }

    if (deliveryRequest.status === 'delivered') {
      throw new BadRequestError('You are not allowed to deliver this delivery request');
    }

    if(status === 'accepted' && deliveryRequest.status !== 'pending') {
      throw new BadRequestError('You are not allowed to accept this delivery request');
    }

    if(status === 'rejected' && deliveryRequest.status !== 'pending') {
      throw new BadRequestError('You are not allowed to reject this delivery request');
    }

    if(status === 'delivered' && deliveryRequest.status !== 'accepted') {
      throw new BadRequestError('You are not allowed to deliver this delivery request');
    }

    const newDeliveryRequest = await this.deliveryRequestRepository.updateStatus(id, status);

    return newDeliveryRequest;
  }

  async cancel(userId: string, id: string) {
    const deliveryRequest = await this.deliveryRequestRepository.showById(id);
    const customer = await this.customerService.getByUserId(userId);

    if (!deliveryRequest) {
      throw new NotFoundError('Delivery request not found');
    }

    if (deliveryRequest.customerId !== customer.id) {
      throw new UnauthorizedError('You are not allowed to cancel this delivery request');
    }

    if (deliveryRequest.status === 'canceled') {
      throw new BadRequestError('Delivery request already canceled');
    }

    if (deliveryRequest.status !== 'pending') {
      throw new BadRequestError('You are not allowed to cancel this delivery request');
    }

    await this.deliveryRequestRepository.updateStatus(id, 'canceled');
  }
}

export { RequestService };