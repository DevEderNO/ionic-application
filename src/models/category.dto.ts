import { IProductDTO } from "./product.dto";

export interface ICategoryDTO {
  id: string;
  name: string;
  products?: IProductDTO[];
}
