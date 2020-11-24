import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ICityDTO } from "../../models/city.dto";

@Injectable()
export class CityService {
  constructor(public http: HttpClient) {}

  findAll(estado_id: string): Observable<ICityDTO[]> {
    return this.http.get<ICityDTO[]>(
      `${API_CONFIG.baseUrl}/states/${estado_id}/cities`
    );
  }
}
