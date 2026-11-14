import { Routes } from '@angular/router';
import {HomeMainComponent} from './components/home/home-main/home-main.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeMainComponent,
  },
  {
    path: 'kork-pys',
    loadComponent: () => import('./components/projects/kork-pys/kork-pys.component').then(m => m.KorkPysComponent)
  },
  {
    path: 'bus-control',
    loadComponent: () => import('./components/projects/bus-control/bus-control.component').then(m => m.BusControlComponent)
  },
  {
    path: 'gosqu-restaurant',
    loadComponent: () => import('./components/projects/gosqu-restaurant/gosqu-restaurant.component').then(m => m.GosquRestaurantComponent)
  }
];
