import { Component, OnInit } from '@angular/core';
import { SharedConfModule } from '../../shared/shared-conf.module';
import { MenuItem } from 'primeng/api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [SharedConfModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  menus: MenuItem[] | undefined;

  ngOnInit() {
    this.menus = [
      { label: 'My Profile', icon: 'pi pi-user' },
      { label: 'Settings', icon: 'pi pi-cog' },
      { label: 'Logout', icon: 'pi pi-power-off' },
    ];
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
      },
      {
        label: 'Users',
        icon: 'pi pi-users',
        items: [
          {
            label: 'Manage Users',
            icon: 'pi pi-users',
          },
          {
            label: 'Blocks',
            icon: 'pi pi-server',
          },
        ],
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
      },
    ];
  }
}
