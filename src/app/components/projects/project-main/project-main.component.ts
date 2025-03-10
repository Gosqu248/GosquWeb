import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {LanguageService} from '../../../services/language.service';
import {ProjectDescription} from '../../../interface/project-description';
import {HomeContactComponent} from '../../home/home-contact/home-contact.component';

@Component({
  selector: 'app-project-main',
  imports: [
    NgForOf,
    RouterLink,
    NgIf,
    HomeContactComponent

  ],
  templateUrl: './project-main.component.html',
  styleUrl: './project-main.component.scss'
})
export class ProjectMainComponent implements OnInit {
  @Input() projectDescription!: ProjectDescription;
  imageIndex = 0;
  constructor(private languageService: LanguageService) {
  }
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  getTranslation(key: any): string {
    return this.languageService.getTranslation(key);
  }

  changeImage(number: number) {
    this.imageIndex = (this.imageIndex + number) % this.projectDescription.imageUrls.length;
  }
}
