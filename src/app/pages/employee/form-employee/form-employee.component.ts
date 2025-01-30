import { Component, inject, OnInit } from '@angular/core';
import { SharedConfModule } from '../../../shared/shared-conf.module';
import { ContainerComponent } from '../../../layouts/container/container.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Department, Position } from '../../../core/model/common.model';
import { DepartmentService } from '../../../core/services/department.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-form-employee',
  imports: [
    SharedConfModule,
    ContainerComponent,
    RouterLink,
    ReactiveFormsModule,
  ],
  standalone: true,
  templateUrl: './form-employee.component.html',
  styleUrl: './form-employee.component.scss',
  providers: [MessageService],
})
export class FormEmployeeComponent implements OnInit {
  pageTitle = 'Create Employee';
  employeeForm!: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  departmentService: DepartmentService = inject(DepartmentService);
  employeeService: EmployeeService = inject(EmployeeService);
  router: Router = inject(Router);
  positions: Position[] = [];
  departments: Department[] = [];
  position: string = '';
  employeeId: number = 0;
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  editMode = false;
  messageService: MessageService = inject(MessageService);
  employeeSubscription: Subscription = new Subscription();

  constructor() {
    this.employeeForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.required]),
      hireDate: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
    });

    this.positions = [
      { name: 'Software Engineer' },
      { name: 'Senior Software Engineer' },
      { name: 'Tech Lead' },
      { name: 'Engineering Manager' },
      { name: 'DevOps Engineer' },
    ];
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.pageTitle = 'Edit Employee';
        this.editMode = true;
        this.employeeId = params['id'];
        this.employeeService
          .getEmployeeById(params['id'])
          .subscribe((response) => {
            this.employeeForm.patchValue(response.data);
            this.employeeForm.patchValue({
              hireDate: new Date(response.data.hireDate),
              department: response.data.department.id,
            });
          });
      }
    });
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

  onSubmit() {
    if (this.employeeForm.valid) {
      const employeeObservable = this.editMode
        ? this.employeeService.updateEmployee(
            this.employeeId,
            this.employeeForm.value,
          )
        : this.employeeService.storeEmployee(this.employeeForm.value);

      this.employeeSubscription = employeeObservable.subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message,
            life: 1000,
          });
          setTimeout(() => {
            this.router.navigate(['/employee']);
          }, 1000);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.employeeSubscription.unsubscribe();
  }
}
