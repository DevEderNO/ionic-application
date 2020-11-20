import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";
import { Observable } from "rxjs";
import { StorageService } from "../services/storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    public storageService: StorageService,
    public alertCtrl: AlertController
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).catch((error, caught) => {
      let errorObj = error;
      if (errorObj.error) {
        errorObj = errorObj.error;
      }
      if (!errorObj.status) {
        errorObj = JSON.parse(errorObj);
      }

      switch (errorObj.status) {
        case 403:
          this.handle403();
          break;
        case 401:
          this.handle401();
        default:
          this.handleDefualtError(errorObj);
          break;
      }

      console.log("Erro detectado pelo interceptor");
      console.log(errorObj);
      return Observable.throw(error);
    }) as any;
  }

  handle403() {
    this.storageService.setLocalUser(null);
  }

  handle401() {
    let alert = this.alertCtrl.create({
      title: "Erro 401: autenticated failed",
      message: "Incorrect email or password",
      enableBackdropDismiss: false,
      buttons: [{ text: "Ok" }],
    });
    alert.present();
  }

  handleDefualtError(errorObj: any) {
    let alert = this.alertCtrl.create({
      title: `Erro ${errorObj.status}: ${errorObj.error}`,
      message: errorObj.message,
      enableBackdropDismiss: false,
      buttons: [{ text: "Ok" }],
    });
    alert.present();
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
