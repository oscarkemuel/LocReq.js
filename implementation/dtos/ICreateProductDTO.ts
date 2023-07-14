import { ICreateProductDTOAB } from "../../src/dtos/ICreateProductDTOAB";

interface ICreateProductDTO extends ICreateProductDTOAB {
  quantity: number;
}

export {ICreateProductDTO}