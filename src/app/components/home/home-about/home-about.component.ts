import { Component } from '@angular/core';
import {AnimationOptions, LottieComponent} from 'ngx-lottie';


@Component({
  selector: 'app-home-about',
  imports: [
    LottieComponent,
  ],
  standalone: true,
  templateUrl: './home-about.component.html',
  styleUrl: './home-about.component.scss'

})
export class HomeAboutComponent {
  yearsOfExperience = new Date().getFullYear() - 2024;

  lottieOptions: AnimationOptions = {
    path: 'assets/lottie/coding.json',
  }

  expertise = [
    {
      title: 'Web Development',
      description: 'Modern frameworks, responsive design, and scalable architecture'
    },
    {
      title: 'Mobile Apps',
      description: 'Native and cross-platform solutions with premium UX'
    },
    {
      title: 'Cloud Solutions',
      description: 'Secure cloud integration and optimization services'
    }
  ];

  onAnimationCreated(animation: any) {
    animation.setSpeed(0.7);
  }
}
