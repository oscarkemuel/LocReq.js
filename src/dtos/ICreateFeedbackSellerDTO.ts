interface ICreateFeedbackSellerDTO {
  sellerId: string;
  customerId: string;
  rating: number;
  comment?: string;
}

export {ICreateFeedbackSellerDTO}