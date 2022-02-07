import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from './shared/model/employee';
import { EmployeeService } from './shared/service/employee.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  employees: Array<Employee> = new Array<Employee>();
  employee: any;

  constructor(private employeeService: EmployeeService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getEmployee();
  }

  public getEmployee(): void {
    this.employeeService.getEmployees().subscribe(
      (employees: Employee[]) => {
        this.employees = employees;
      },
      (error: HttpErrorResponse) => {
          console.error(error);
      }
    );
  }

  public openModal(modalType: any, employee?: Employee): void {
    this.employee = employee;
    this.modalService.open(modalType);
  }

  public addEmployee(form: NgForm, modal: NgbModalRef): void {
    this.employeeService.saveEmployee(form.value).subscribe(
      (response: Employee) => {
        this.getEmployee();
        modal.close();
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  public editEmployee(ngForm: NgForm, modal: NgbModalRef){
    this.employeeService.updateEmployee(ngForm.value).subscribe(
      (response: Employee) => {
        this.getEmployee();
        modal.close();
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  public deleteEmployee(ngForm: NgForm, modal: NgbModalRef): void {
    this.employeeService.deleteEmployee(ngForm.value.id).subscribe(
      (response: any) => {
        this.getEmployee();
        modal.close();
      },
      (error: HttpErrorResponse) => {console.error(error)}
    );
  }

  public searchEmployee(key: string): void {
    const employees: Employee[] = [];
    if(key) {
      for (const employee of this.employees) {
        if (employee.name.toLowerCase().indexOf(key.toLowerCase()) != -1 
          || employee.email.toLowerCase().indexOf(key.toLowerCase()) != -1
          || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) != -1
          || employee.phone.toLowerCase().indexOf(key.toLowerCase()) != -1) {
          employees.push(employee);
        }
      }
      this.employees = employees;
    }
    
    /** if nothing found in search */
    else {
      this.getEmployee();
    }
  }

}
