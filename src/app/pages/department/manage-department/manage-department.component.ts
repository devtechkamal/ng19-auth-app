import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SharedConfModule } from '../../../shared/shared-conf.module';
import { ContainerComponent } from '../../../layouts/container/container.component';
import { Router, RouterLink } from '@angular/router';
import { Department } from '../../../core/model/common.model';
import { DepartmentService } from '../../../core/services/department.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-manage-department',
  imports: [DatePipe, SharedConfModule, ContainerComponent, RouterLink],
  standalone: true,
  templateUrl: './manage-department.component.html',
  styleUrl: './manage-department.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ManageDepartmentComponent implements OnInit {
  pageTitle = 'Manage Department';
  departments: Department[] = [];
  loading = false;
  departmentService: DepartmentService = inject(DepartmentService);
  confirmationService: ConfirmationService = inject(ConfirmationService);
  messageService: MessageService = inject(MessageService);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (response) => {
        this.departments = response.data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  editDepartment(id: number) {
    this.router.navigate(['department', id, 'edit']);
  }

  deleteDepartment(event: Event, id: number) {
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
        this.departmentService.deleteDepartment(id).subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.message,
              life: 1000,
            });
            this.getDepartments();
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
