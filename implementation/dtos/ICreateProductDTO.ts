import { ICreateProductDTOAB } from "../../src/dtos/ICreateProductDTOAB";

interface ICreateProductDTO extends ICreateProductDTOAB {
  startTime: Date;
  endTime: Date;
  available: boolean;
}

export { ICreateProductDTO };
