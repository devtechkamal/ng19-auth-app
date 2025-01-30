import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MasterComponent } from './layouts/master/master.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ManageEmployeeComponent } from './pages/employee/manage-employee/manage-employee.component';
import { FormEmployeeComponent } from './pages/employee/form-employee/form-employee.component';
import { DefaultComponent } from './layouts/default/default.component';
import { ManageRoleComponent } from './pages/role/manage-role/manage-role.component';
import { CreateRoleComponent } from './pages/role/create-role/create-role.component';
import { ManageDepartmentComponent } from './pages/department/manage-department/manage-department.component';
import { FormDepartmentComponent } from './pages/department/form-department/form-department.component';
import { guestGuard } from './core/guards/guest.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: DefaultComponent,
    canActivate: [guestGuard],
    children: [{ path: 'login', component: LoginComponent }],
  },
  {
    path: '',
    component: MasterComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'employee', component: ManageEmployeeComponent },
      { path: 'employee/create', component: FormEmployeeComponent },
      {
        path: 'employee/:id/edit',
        component: FormEmployeeComponent,
      },
      { path: 'role', component: ManageRoleComponent },
      { path: 'role/create', component: CreateRoleComponent },
      { path: 'department', component: ManageDepartmentComponent },
      {
        path: 'department/create',
        component: FormDepartmentComponent,
      },
      {
        path: 'department/:id/edit',
        component: FormDepartmentComponent,
      },
    ],
  },
];
