import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, Role } from '../model/common.model';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {}

  getRoles(): Observable<ApiResponse<Role[]>> {
    return this.http.get<ApiResponse<Role[]>>(`${ApiEndpoint.RoleEndpoint}`);
  }

  storeRole(role: Role): Observable<ApiResponse<Role>> {
    return this.http.post<ApiResponse<Role>>(
      `${ApiEndpoint.RoleEndpoint}`,
      role,
    );
  }
}
