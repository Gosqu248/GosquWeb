import { Component } from '@angular/core';
import {HomeAboutComponent} from '../home-about/home-about.component';
import {HomeTechComponent} from '../home-tech/home-tech.component';
import {HomeProjectsComponent} from '../home-projects/home-projects.component';
import {HomeContactComponent} from '../home-contact/home-contact.component';
import {HomeOffersComponent} from '../home-offers/home-offers.component';
import {HomeVideoComponent} from '../home-video/home-video.component';
import {HomeWhyUsComponent} from '../home-why-us/home-why-us.component';

@Component({
  selector: 'app-home-main',
  imports: [
    HomeAboutComponent,
    HomeTechComponent,
    HomeProjectsComponent,
    HomeContactComponent,
    HomeOffersComponent,
    HomeVideoComponent,
    HomeWhyUsComponent,
  ],
  templateUrl: './home-main.component.html',
  styleUrl: './home-main.component.scss'
})
export class HomeMainComponent {

}
