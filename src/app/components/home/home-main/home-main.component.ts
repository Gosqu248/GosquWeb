import { Component } from '@angular/core';
import {HomeAboutComponent} from '../home-about/home-about.component';
import {HomeWhatDoComponent} from '../home-what-do/home-what-do.component';
import {HomeTechComponent} from '../home-tech/home-tech.component';
import {HomeProjectsComponent} from '../home-projects/home-projects.component';
import {HomeContactComponent} from '../home-contact/home-contact.component';

@Component({
  selector: 'app-home-main',
  imports: [
    HomeAboutComponent,
    HomeWhatDoComponent,
    HomeTechComponent,
    HomeProjectsComponent,
    HomeContactComponent
  ],
  templateUrl: './home-main.component.html',
  styleUrl: './home-main.component.scss'
})
export class HomeMainComponent {

}
