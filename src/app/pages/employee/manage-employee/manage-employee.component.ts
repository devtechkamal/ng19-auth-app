import { Component, inject } from '@angular/core';
import { SharedConfModule } from '../../../shared/shared-conf.module';
import { ContainerComponent } from '../../../layouts/container/container.component';
import { Employee } from '../../../core/model/employee.model';
import { Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-manage-employee',
  imports: [SharedConfModule, ContainerComponent, RouterLink],
  templateUrl: './manage-employee.component.html',
  styleUrl: './manage-employee.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ManageEmployeeComponent {
  employees: Employee[] = [];
  employeeService: EmployeeService = inject(EmployeeService);
  confirmationService: ConfirmationService = inject(ConfirmationService);
  messageService: MessageService = inject(MessageService);
  loading = false;
  router: Router = inject(Router);

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (response) => {
        this.employees = response.data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  editEmployee(id: number) {
    this.router.navigate(['employee', id, 'edit']);
  }

  deleteEmployee(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Save',
      },
      accept: () => {
        this.employeeService.deleteEmployee(id).subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.message,
              life: 1000,
            });
            this.getEmployees();
          },
          error: (error) => {
            console.error(error);
          },
        });
      },
      reject: () => {},
    });
  }
}
