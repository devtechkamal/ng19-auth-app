import { Component, inject } from '@angular/core';
import { SharedConfModule } from '../../../shared/shared-conf.module';
import { ContainerComponent } from '../../../layouts/container/container.component';
import { Route, Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RoleService } from '../../../core/services/role.service';

@Component({
  selector: 'app-create-role',
  imports: [
    SharedConfModule,
    ContainerComponent,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.scss',
  providers: [MessageService],
})
export class CreateRoleComponent {
  pageTitle = 'Create Role';
  roleForm!: FormGroup;
  roleService: RoleService = inject(RoleService);
  fb: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  messageService: MessageService = inject(MessageService);

  constructor() {
    this.roleForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.roleForm.valid) {
      this.roleService.storeRole(this.roleForm.value).subscribe({
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
      this.roleForm.markAllAsTouched();
    }
  }
}
