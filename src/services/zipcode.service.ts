import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { IViaCep } from "../models/viacep";

@Injectable()
export class ZipCodeService {
  constructor(public http: HttpClient) {}

  find(zipCode: string): Observable<IViaCep> {
    return this.http.get<IViaCep>(`https://viacep.com.br/ws/${zipCode}/json/`);
  }
}
