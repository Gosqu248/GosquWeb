import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavMainComponent} from './components/nav/nav-main/nav-main.component';
import { Router, NavigationEnd } from '@angular/router';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    NavMainComponent,
    RouterOutlet
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const fragment = this.router.parseUrl(event.url).fragment;
        if (fragment) {
          this.viewportScroller.scrollToAnchor(fragment);
        }
      }
    });
  }

  title = 'GosquWeb';
}
