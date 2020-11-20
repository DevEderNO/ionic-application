import { IStateDTO } from "./state.dto";

export interface ICityDTO {
  id: string;
  name: string;
  state: IStateDTO;
}
