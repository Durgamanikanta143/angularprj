import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee as EmployeeModel } from '../../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:5064/Employee';

  constructor(private http: HttpClient) {}

  // GET
  getall(): Observable<EmployeeModel[]> {

    return this.http.get<EmployeeModel[]>(this.apiUrl);

  }

  // POST
 // POST - Add Employee
addEmployee(employee: EmployeeModel): Observable<EmployeeModel> {

  return this.http.post<EmployeeModel>(
    this.apiUrl,
    employee
  );

}


// PUT - Update Employee
updateEmployee(
  id: number,
  employee: EmployeeModel
): Observable<EmployeeModel> {

  return this.http.put<EmployeeModel>(
    `${this.apiUrl}/${id}`,
    employee
  );
}
  // DELETE
  deleteEmployee(id: number): Observable<EmployeeModel> {

    return this.http.delete<EmployeeModel>(
      `${this.apiUrl}/${id}`
    );

  }

}