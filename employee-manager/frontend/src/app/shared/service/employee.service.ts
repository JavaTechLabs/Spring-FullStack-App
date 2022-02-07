import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiServerUrl + '/api/v1/employee');
  }

  public saveEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiServerUrl + '/api/v1/employee', employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.apiServerUrl + '/api/v1/employee', employee);
  }

  public deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(this.apiServerUrl + '/api/v1/employee/'+id);
  }

  public getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.apiServerUrl + '/api/v1/employee/'+id);
  }

}
