import { ICreateProductDTOAB } from "../../src/dtos/ICreateProductDTOAB";

interface ICreateProductDTO extends ICreateProductDTOAB {
  model: string;
  available?: boolean;
}

export {ICreateProductDTO}