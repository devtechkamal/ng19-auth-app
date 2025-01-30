import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../model/common.model';
import { Employee } from '../model/employee.model';
import { ApiEndpoint } from '../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployees(): Observable<ApiResponse<Employee[]>> {
    return this.http.get<ApiResponse<Employee[]>>(
      `${ApiEndpoint.EmployeeEndpoint}`,
    );
  }

  getEmployeeById(id: number): Observable<ApiResponse<Employee>> {
    return this.http.get<ApiResponse<Employee>>(
      `${ApiEndpoint.EmployeeEndpoint}/${id}`,
    );
  }

  storeEmployee(employee: Employee): Observable<ApiResponse<Employee>> {
    return this.http.post<ApiResponse<Employee>>(
      `${ApiEndpoint.EmployeeEndpoint}`,
      employee,
    );
  }

  updateEmployee(
    id: number,
    employee: Employee,
  ): Observable<ApiResponse<Employee>> {
    return this.http.post<ApiResponse<Employee>>(
      `${ApiEndpoint.EmployeeEndpoint}/${id}`,
      employee,
    );
  }

  deleteEmployee(id: number): Observable<ApiResponse<Employee>> {
    return this.http.delete<ApiResponse<Employee>>(
      `${ApiEndpoint.EmployeeEndpoint}/${id}`,
    );
  }
}
