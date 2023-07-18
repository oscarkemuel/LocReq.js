import { ICreateDeliveryRequestDTOAB } from "../../src/dtos/ICreateDeliveryRequestDTOAB";

interface ICreateDeliveryRequestDTO extends ICreateDeliveryRequestDTOAB {
  days: number;
}

export { ICreateDeliveryRequestDTO };