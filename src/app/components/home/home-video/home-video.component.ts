import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { LanguageService } from "../../../services/language.service";
import { HomeMoveListComponent } from "../home-move-list/home-move-list.component";
import {Language} from '../../../interface/language';

@Component({
  selector: 'app-home-video',
  templateUrl: './home-video.component.html',
  imports: [ HomeMoveListComponent ],
  styleUrls: ['./home-video.component.scss']
})
export class HomeVideoComponent implements AfterViewInit{
  @ViewChild('videoPlayer', { static: false })
  videoPlayer!: ElementRef<HTMLVideoElement>;

  constructor(private languageService: LanguageService) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.videoPlayer.nativeElement
        .play()
        .then(() => console.log('Wideo zaczęło grać'))
        .catch(err => console.error('play() odrzucone:', err));
    }, 500);
  }

  getTranslation<K extends keyof Language>(key: K) {
    return this.languageService.getTranslation(key);
  }
}
