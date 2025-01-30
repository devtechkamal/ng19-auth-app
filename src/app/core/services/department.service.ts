import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, Department } from '../model/common.model';
import { ApiEndpoint } from '../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private http: HttpClient) {}

  getDepartments(): Observable<ApiResponse<Department[]>> {
    return this.http.get<ApiResponse<Department[]>>(
      `${ApiEndpoint.DepartmentEndpoint}`,
    );
  }

  getDepartmentById(id: number): Observable<ApiResponse<Department>> {
    return this.http.get<ApiResponse<Department>>(
      `${ApiEndpoint.DepartmentEndpoint}/${id}`,
    );
  }

  storeDepartment(department: Department): Observable<ApiResponse<Department>> {
    return this.http.post<ApiResponse<Department>>(
      `${ApiEndpoint.DepartmentEndpoint}`,
      department,
    );
  }

  updateDepartment(
    id: number,
    department: Department,
  ): Observable<ApiResponse<Department>> {
    return this.http.post<ApiResponse<Department>>(
      `${ApiEndpoint.DepartmentEndpoint}/${id}`,
      department,
    );
  }

  deleteDepartment(id: number): Observable<ApiResponse<Department>> {
    return this.http.delete<ApiResponse<Department>>(
      `${ApiEndpoint.DepartmentEndpoint}/${id}`,
    );
  }
}
