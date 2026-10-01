import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EmployeeService } from './services/employee';
import { Employee as EmployeeModel } from '../models/employee';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  employees: EmployeeModel[] = [];

  newEmployee: EmployeeModel = {
    id: 0,
    name: '',
    desgination: '',
    sal: 0
  };

  isEdit = false;
  showForm = false;
  formError = '';

  constructor(private employeeService: EmployeeService) {}

  // GET
  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {

    this.employeeService.getall().subscribe({

      next: (data) => {
        this.employees = data;
      },

      error: (err) => {
        console.error('GET ERROR:', err);
      }

    });

  }

  // ADD / UPDATE
  saveEmployee(): void {
    this.formError = '';

    if (this.isEdit) {

      // PUT
      this.employeeService
        .updateEmployee(this.newEmployee.id, this.newEmployee)
        .subscribe({

          next: () => {
            this.getEmployees();
            this.closeForm();
          },

          error: (err) => {
            console.error('UPDATE ERROR:', err);
            this.formError = 'Could not update employee. Check that the API is running and the route is correct.';
          }

        });

    } else {

      // POST
      this.employeeService
        .addEmployee(this.newEmployee)
        .subscribe({

          next: () => {
            this.getEmployees();
            this.closeForm();
          },

          error: (err) => {
            console.error('ADD ERROR:', err);
            this.formError = 'Could not add employee. Check that the API is running and the route is correct.';
          }

        });

    }

  }

  // EDIT
  editEmployee(employee: EmployeeModel): void {

    this.newEmployee = {
      ...employee
    };

    this.isEdit = true;
    this.formError = '';
    this.showForm = true;

  }

  // DELETE
  deleteEmployee(id: number): void {

    if (!confirm('Are you sure you want to delete?')) {
      return;
    }

    this.employeeService
      .deleteEmployee(id)
      .subscribe({

        next: () => {
          this.getEmployees();
        },

        error: (err) => {
          console.error('DELETE ERROR:', err);
        }

      });

  }

  // OPEN ADD
  openAdd(): void {

    this.newEmployee = {
      id: 0,
      name: '',
      desgination: '',
      sal: 0
    };

    this.isEdit = false;
    this.formError = '';
    this.showForm = true;

  }

  // CLOSE
  closeForm(): void {

    this.newEmployee = {
      id: 0,
      name: '',
      desgination: '',
      sal: 0
    };

    this.isEdit = false;
    this.showForm = false;
    this.formError = '';

  }

}