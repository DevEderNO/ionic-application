import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { IStateDTO } from "../../models/state.dto";

@Injectable()
export class StateService {
  constructor(public http: HttpClient) {}

  findAll(): Observable<IStateDTO[]> {
    return this.http.get<IStateDTO[]>(`${API_CONFIG.baseUrl}/states`);
  }
}
