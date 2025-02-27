import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavMainComponent} from './components/nav/nav-main/nav-main.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    NavMainComponent,
    RouterOutlet
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'GosquWeb';
}
