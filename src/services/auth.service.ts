import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelper } from "angular2-jwt";
import { API_CONFIG } from "../config/api.config";
import { ICredentialsDTO } from "../models/credentials.dto";
import { ILocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService {
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(public http: HttpClient, public storageService: StorageService) {}

  authenticete(creds: ICredentialsDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
      observe: "response",
      responseType: "text",
    });
  }

  successfullLogin(authorizationValue: string) {
    let [_, token] = authorizationValue.split(" ");
    let user: ILocalUser = {
      token,
      email: this.jwtHelper.decodeToken(token).sub,
    };

    this.storageService.setLocalUser(user);
  }

  logout() {
    this.storageService.setLocalUser(null);
  }
}
