import { Component, Input } from '@angular/core';
import { SharedConfModule } from '../../shared/shared-conf.module';

@Component({
  selector: 'app-container',
  imports: [SharedConfModule],
  standalone: true,
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
})
export class ContainerComponent {
  @Input() pageTitle: string = '';
}
