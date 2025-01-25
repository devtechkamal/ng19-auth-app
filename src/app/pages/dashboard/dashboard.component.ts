import { Component } from '@angular/core';
import { ContainerComponent } from '../../layouts/container/container.component';

@Component({
  selector: 'app-dashboard',
  imports: [ContainerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
