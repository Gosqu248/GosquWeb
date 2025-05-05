import { Component} from '@angular/core';
import { LanguageService } from "../../../services/language.service";
import { HomeMoveListComponent } from "../home-move-list/home-move-list.component";
import {Language} from '../../../interface/language';

@Component({
  selector: 'app-home-video',
  templateUrl: './home-video.component.html',
  imports: [ HomeMoveListComponent ],
  styleUrls: ['./home-video.component.scss']
})
export class HomeVideoComponent  {
  constructor(private languageService: LanguageService) {}

  getTranslation<K extends keyof Language>(key: K) {
    return this.languageService.getTranslation(key);
  }
}
