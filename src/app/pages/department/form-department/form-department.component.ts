import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedConfModule } from '../../../shared/shared-conf.module';
import { ContainerComponent } from '../../../layouts/container/container.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DepartmentService } from '../../../core/services/department.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-department',
  imports: [
    SharedConfModule,
    ContainerComponent,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './form-department.component.html',
  styleUrl: './form-department.component.scss',
  providers: [MessageService],
})
export class FormDepartmentComponent implements OnInit, OnDestroy {
  pageTitle = 'Create Department';
  departmentForm!: FormGroup;
  departmentService: DepartmentService = inject(DepartmentService);
  fb: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  messageService: MessageService = inject(MessageService);
  editMode = false;
  departmentId: number = 0;
  departmentSubscription: Subscription = new Subscription();

  constructor() {
    this.departmentForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.pageTitle = 'Edit Department';
        this.editMode = true;
        this.departmentId = params['id'];
        this.departmentService
          .getDepartmentById(params['id'])
          .subscribe((response) => {
            this.departmentForm.patchValue(response.data);
          });
      }
    });
  }

  onSubmit() {
    if (this.departmentForm.valid) {
      const departmentObservable = this.editMode
        ? this.departmentService.updateDepartment(
            this.departmentId,
            this.departmentForm.value,
          )
        : this.departmentService.storeDepartment(this.departmentForm.value);

      this.departmentSubscription = departmentObservable.subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message,
            life: 1000,
          });
          setTimeout(() => {
            this.router.navigate(['/department']);
          }, 1000);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.departmentForm.markAllAsTouched();
    }
  }

  getDepartmentById(id: number) {
    this.departmentService.getDepartmentById(id).subscribe((response) => {
      this.departmentForm.patchValue(response.data);
    });
  }

  ngOnDestroy(): void {
    this.departmentSubscription.unsubscribe();
  }
}
