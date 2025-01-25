import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PrimaryBtnComponent } from './components/primary-btn/primary-btn.component';
import { SecondaryBtnComponent } from './components/secondary-btn/secondary-btn.component';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CardModule } from 'primeng/card';

const MODULES = [
  MenubarModule,
  BadgeModule,
  AvatarModule,
  InputTextModule,
  ButtonModule,
  Menu,
  BreadcrumbModule,
  PrimaryBtnComponent,
  SecondaryBtnComponent,
  TableModule,
  RatingModule,
  IconFieldModule,
  InputIconModule,
  MultiSelectModule,
  SelectModule,
  CardModule,
];

@NgModule({
  declarations: [],
  imports: [...MODULES],
  exports: [...MODULES],
})
export class SharedConfModule {}
