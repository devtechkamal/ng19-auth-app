import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MasterComponent } from './layouts/master/master.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ManageEmployeeComponent } from './pages/employee/manage-employee/manage-employee.component';
import { CreateEmployeeComponent } from './pages/employee/create-employee/create-employee.component';
import { DefaultComponent } from './layouts/default/default.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: DefaultComponent,
    children: [{ path: 'login', component: LoginComponent }],
  },
  {
    path: '',
    component: MasterComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'employee', component: ManageEmployeeComponent },
      { path: 'employee/create', component: CreateEmployeeComponent },
    ],
  },
];
