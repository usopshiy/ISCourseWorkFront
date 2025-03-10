import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ItemsOverviewComponent} from './components/items-overview/items-overview.component';
import {RequestsOverviewComponent} from './components/requests-overview/requests-overview.component';
import {ColonyOverviewComponent} from './components/colony-overview/colony-overview.component';
import {OperationsOverviewComponent} from './components/operations-overview/operations-overview.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "storage/items",
    component: ItemsOverviewComponent
  },
  {
    path: "requests-overview",
    component: RequestsOverviewComponent
  },
  {
    path: "colonies-overview",
    component: ColonyOverviewComponent
  },
  {
    path: "operations-overview",
    component: OperationsOverviewComponent
  }
];
