import { Component } from '@angular/core';
import {ProjectMainComponent} from "../project-main/project-main.component";
import {ProjectDescription} from '../../../interface/project-description';
import {HomeContactComponent} from '../../home/home-contact/home-contact.component';

@Component({
  selector: 'app-bus-control',
  imports: [
    ProjectMainComponent,
    HomeContactComponent
  ],
  templateUrl: './bus-control.component.html',
  styleUrl: './bus-control.component.scss'
})
export class BusControlComponent {
  projectDescription: ProjectDescription = {
    title: 'Bus Control',
    description: 'busDescription',
    features: [
      'downloadDatabase',
      'updateDatabase',
      'downloadVariant',
      'plannedHours',
      'showStops',
      'sendCurrentLocation',
      'mp3',
      'reverseCurse',
      'sendBusOnStop',
      'sendLostBusOnStop',
      'wifiCheck',

    ],
    techStack: [
      'Java',
      'Android',
      'Room DB',
      'Gradle',
      'REST API',
    ],
    imageUrls: [
      '/assets/img/BusControl.jpeg',
    ],
  }

}
