// home-video.component.ts
import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import {Language} from "../../../interface/language";
import {LanguageService} from "../../../services/language.service";
import {HomeMoveListComponent} from "../home-move-list/home-move-list.component";

@Component({
  selector: 'app-home-video',
  templateUrl: './home-video.component.html',
  imports: [
    HomeMoveListComponent
  ],
  styleUrls: ['./home-video.component.scss']
})
export class HomeVideoComponent implements AfterViewInit, OnDestroy {
  @ViewChild('videoPlayer', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;

  // klatki na sekundę dla “manualnej” pętli
  private fps = 20;
  // czas między krokami
  private step = 0.8 / this.fps;
  private reverse = false;
  private loopId!: number;

  constructor(private languageService: LanguageService) {}

  ngAfterViewInit() {
    const video = this.videoRef.nativeElement;
    video.pause();            // upewniamy się, że nie gra “automatycznie”
    video.currentTime = 0;    // start od początku

    // startujemy manualną pętlę
    this.loopId = window.setInterval(() => this.boomerangStep(), 1000 / this.fps);
  }

  private boomerangStep() {
    const video = this.videoRef.nativeElement;
    if (!this.reverse) {
      // krok do przodu
      let next = video.currentTime + this.step;
      if (next >= video.duration) {
        // osiągnęliśmy koniec → zmiana kierunku
        this.reverse = true;
        next = video.duration - this.step;
      }
      video.currentTime = next;
    } else {
      // krok w tył
      let next = video.currentTime - this.step;
      if (next <= 0) {
        // osiągnęliśmy początek → zmiana kierunku
        this.reverse = false;
        next = this.step;
      }
      video.currentTime = next;
    }
  }

  getTranslation<K extends keyof Language>(key: K) {
    return this.languageService.getTranslation(key);
  }

  ngOnDestroy() {
    clearInterval(this.loopId);
  }
}
