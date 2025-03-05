import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {LanguageService} from '../../../services/language.service';
import {ProjectDescription} from '../../../interface/project-description';

@Component({
  selector: 'app-project-main',
  imports: [
    NgForOf

  ],
  templateUrl: './project-main.component.html',
  styleUrl: './project-main.component.scss'
})
export class ProjectMainComponent {
  @Input() projectDescription!: ProjectDescription;
  constructor(private languageService: LanguageService) {
  }

  getTranslation(key: any): string {
    return this.languageService.getTranslation(key);
  }
}
