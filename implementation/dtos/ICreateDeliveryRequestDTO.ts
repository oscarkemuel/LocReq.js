import { ICreateDeliveryRequestDTOAB } from "../../src/dtos/ICreateDeliveryRequestDTOAB";

interface ICreateDeliveryRequestDTO extends ICreateDeliveryRequestDTOAB {
  quantity: number;
}

export { ICreateDeliveryRequestDTO };