import { Component, inject, OnInit } from '@angular/core';
import { SharedConfModule } from '../../../shared/shared-conf.module';
import { ContainerComponent } from '../../../layouts/container/container.component';
import { RouterLink } from '@angular/router';
import { RoleService } from '../../../core/services/role.service';
import { Role } from '../../../core/model/common.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manage-role',
  imports: [DatePipe, SharedConfModule, ContainerComponent, RouterLink],
  templateUrl: './manage-role.component.html',
  styleUrl: './manage-role.component.scss',
})
export class ManageRoleComponent implements OnInit {
  pageTitle = 'Manage Role';
  roles: Role[] = [];
  loading = false;
  roleService: RoleService = inject(RoleService);

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    this.roleService.getRoles().subscribe({
      next: (response) => {
        this.roles = response.data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
