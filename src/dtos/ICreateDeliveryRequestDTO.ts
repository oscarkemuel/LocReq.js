interface ICreateDeliveryRequestDTO {
  status: string;
  delivery_time: Date;
  quantity: number;
  placeId: string;
  productId: string;
  sellerId: string;
  customerId: string;
}

export {ICreateDeliveryRequestDTO}