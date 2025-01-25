import { Component } from '@angular/core';
import { SharedConfModule } from '../../../shared/shared-conf.module';
import { ContainerComponent } from '../../../layouts/container/container.component';
import { Employee, employees } from '../../../core/model/employee.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-employee',
  imports: [SharedConfModule, ContainerComponent, RouterLink],
  templateUrl: './manage-employee.component.html',
  styleUrl: './manage-employee.component.scss',
})
export class ManageEmployeeComponent {
  employees: Employee[] = employees;
  loading = false;
}
