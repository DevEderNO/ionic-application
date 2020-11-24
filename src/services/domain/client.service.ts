import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { IClientDTO } from "../../models/client.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class ClientService {
  constructor(public http: HttpClient, public storageService: StorageService) {}

  findByEmail(email: string): Observable<IClientDTO> {
    return this.http.get<IClientDTO>(
      `${API_CONFIG.baseUrl}/clients/email?value=${email}`
    );
  }

  getImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
    return this.http.get(url, { responseType: "blob" });
  }

  insert(obj: IClientDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/clients`, obj, {
      observe: "response",
      responseType: "text",
    });
  }

  forgot(email: string) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/auth/forgot`,
      { email },
      {
        observe: "response",
        responseType: "text",
      }
    );
  }
}
