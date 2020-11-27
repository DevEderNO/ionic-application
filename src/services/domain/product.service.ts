import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { IProductDTO } from "../../models/product.dto";

@Injectable()
export class ProductService {
  constructor(public http: HttpClient) {}

  find(id: string): Observable<IProductDTO[]> {
    return this.http.get<IProductDTO[]>(`${API_CONFIG.baseUrl}/products/${id}`);
  }
}
