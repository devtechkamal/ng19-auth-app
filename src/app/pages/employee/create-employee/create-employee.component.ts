import { Component } from '@angular/core';
import { SharedConfModule } from '../../../shared/shared-conf.module';
import { ContainerComponent } from '../../../layouts/container/container.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  imports: [SharedConfModule, ContainerComponent, RouterLink],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.scss',
})
export class CreateEmployeeComponent {}
