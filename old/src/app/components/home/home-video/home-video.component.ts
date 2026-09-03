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
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      this.videoPlayer.nativeElement.muted = true;

      setTimeout(() => {
        this.videoPlayer.nativeElement
          .play()
          .then(() => console.log('Wideo zaczęło grać'))
          .catch(err => console.error('play() odrzucone:', err));
      }, 500);
    }
  }

  unmute() {
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      this.videoPlayer.nativeElement.muted = false;
    }
  }
  getTranslation<K extends keyof Language>(key: K) {
    return this.languageService.getTranslation(key);
  }
}
