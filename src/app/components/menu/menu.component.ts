import {Component, OnInit} from '@angular/core';
import { Menubar } from 'primeng/menubar';
import {MenuItem, MenuItemCommandEvent} from 'primeng/api';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [
    Menubar, CommonModule, RouterLink
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
  items: MenuItem[] | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Colonies',
        icon: 'pi pi-home',
        route: '/colonies-overview'
      },
      {
        label: 'Management',
        icon: 'pi pi-list',
        items: [
          {
            label: 'Operations',
            route: '/operations-overview'
          },
          {
            label: 'Requests',
            route: '/requests-overview'
          }
        ]
      },
      {
        label: 'Storage',
        icon: 'pi pi-box',
        items: [
          {
            label: 'items',
            route: '/storage/items'
          }
        ]
      },
      {
        separator: true
      },
      {
        label: 'Exit',
        icon: 'pi pi-sign-out',
        command(event: MenuItemCommandEvent) {
          localStorage.removeItem("token");
        },
        route: '/login'
      }
    ]
  }

}
