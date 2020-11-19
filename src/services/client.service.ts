import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../config/api.config";
import { IClientDTO } from "../models/client.dto";
import { StorageService } from "./storage.service";

@Injectable()
export class ClientService {
  constructor(public http: HttpClient, public storageService: StorageService) {}

  findByEmail(email: string): Observable<IClientDTO> {
    let token = this.storageService.getLocalUser().token;
    let authHeader = new HttpHeaders({ Authorization: "Bearer " + token });

    return this.http.get<IClientDTO>(
      `${API_CONFIG.baseUrl}/clients/email?value=${email}`,
      {
        headers: authHeader,
      }
    );
  }
}
