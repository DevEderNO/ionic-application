import { ICityDTO } from "./city.dto";

export interface IAddressDTO {
  id: string;
  street: string;
  number: string;
  zipCode: string;
  neighborhood: string;
  complement?: string;
  city: ICityDTO;
}
