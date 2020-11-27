import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ICategoryDTO } from "../../models/category.dto";

@Injectable()
export class CategoryService {
  constructor(public http: HttpClient) {}

  findAll(): Observable<ICategoryDTO[]> {
    return this.http.get<ICategoryDTO[]>(`${API_CONFIG.baseUrl}/categories`);
  }

  find(id: number): Observable<ICategoryDTO> {
    return this.http.get<ICategoryDTO>(
      `${API_CONFIG.baseUrl}/categories/${id}`
    );
  }
}
