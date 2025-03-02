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
  }
];
