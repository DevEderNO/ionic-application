import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../config/api.config";
import { StorageService } from "../services/storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public storageService: StorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let user = this.storageService.getLocalUser();
    let N = API_CONFIG.baseUrl.length;

    let requestToAPI = req.url.substr(0, N) === API_CONFIG.baseUrl;

    if (user && requestToAPI) {
      const authReq = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + user.token),
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
