import { IAddressDTO } from "./address.dto";

export interface IClientDTO {
  id: string;
  name: string;
  email: string;
  image_url?: string;
  addresses?: IAddressDTO[];
}
