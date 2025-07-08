import { Component, Input, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { LanguageService } from '../../../services/language.service';
import { ProjectDescription } from '../../../interface/project-description';

@Component({
  selector: 'app-project-main',
  imports: [NgForOf, RouterLink, NgIf],
  templateUrl: './project-main.component.html',
  styleUrl: './project-main.component.scss'
})
export class ProjectMainComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() projectDescription!: ProjectDescription;
  @ViewChild('heroSection', { static: false }) heroSection!: ElementRef;

  // State variables
  imageIndex = 0;
  isLoading = true;

  // Private properties
  private observer!: IntersectionObserver;
  private autoSlideInterval!: number;
  private readonly SLIDE_INTERVAL = 5000;
  private readonly SWIPE_THRESHOLD = 50;
  private touchStartX = 0;
  private touchEndX = 0;

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.scrollToTop();
    setTimeout(() => {
      this.isLoading = false;
      this.triggerEntryAnimations();
    }, 300);
  }

  ngAfterViewInit(): void {
    this.initializeAnimations();
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.autoSlideInterval) clearInterval(this.autoSlideInterval);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (!this.hasImages()) return;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.changeImage(-1);
        this.resetAutoSlide();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.changeImage(1);
        this.resetAutoSlide();
        break;
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.initializeAnimations();
  }

  // Public API methods
  getTranslation(key: any): string {
    return this.languageService.getTranslation(key);
  }

  changeImage(direction: number): void {
    if (!this.hasImages()) return;

    const totalImages = this.projectDescription.imageUrls!.length;
    this.imageIndex = direction > 0
      ? (this.imageIndex + 1) % totalImages
      : this.imageIndex === 0 ? totalImages - 1 : this.imageIndex - 1;

    this.announceImageChange();
  }

  setImageIndex(index: number): void {
    if (this.isValidImageIndex(index)) {
      this.imageIndex = index;
      this.resetAutoSlide();
      this.announceImageChange();
    }
  }

  // Template helper methods
  getCurrentImageAlt(): string {
    return `${this.projectDescription?.title || ''} - ${this.getTranslation('screenshot')} ${this.imageIndex + 1}`;
  }

  hasMultipleImages(): boolean {
    return (this.projectDescription?.imageUrls?.length || 0) > 1;
  }

  getImageIndicatorLabel(index: number): string {
    return `${this.getTranslation('goToImage')} ${index + 1}`;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/images/placeholder.svg';
    console.warn('Failed to load image:', img.src);
  }

  onImageLoad(event: Event): void {
    (event.target as HTMLImageElement).classList.add('loaded');
  }

  // Touch events for mobile
  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  // Track by functions for performance
  trackByIndex(index: number): number {
    return index;
  }

  trackByFeature(index: number, feature: string): string {
    return feature;
  }

  trackByTech(index: number, tech: string): string {
    return tech;
  }

  // Private helper methods
  private hasImages(): boolean {
    return !!(this.projectDescription?.imageUrls?.length);
  }

  private isValidImageIndex(index: number): boolean {
    return index >= 0 && index < (this.projectDescription?.imageUrls?.length || 0);
  }

  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private initializeAnimations(): void {
    this.observer?.disconnect();

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('animate-in'), index * 100);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    setTimeout(() => {
      const elements = [...document.querySelectorAll('.feature-card, .tech-card')];
      elements.forEach(element => this.observer.observe(element));
    }, 100);
  }

  private triggerEntryAnimations(): void {
    document.querySelectorAll('.project-info, .image-showcase').forEach((element, index) => {
      setTimeout(() => element.classList.add('animate-in'), index * 200);
    });
  }

  private startAutoSlide(): void {
    if (!this.hasMultipleImages()) return;

    this.autoSlideInterval = window.setInterval(() => {
      this.changeImage(1);
    }, this.SLIDE_INTERVAL);
  }

  private resetAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.startAutoSlide();
    }
  }

  private handleSwipe(): void {
    const swipeDistance = this.touchStartX - this.touchEndX;

    if (Math.abs(swipeDistance) < this.SWIPE_THRESHOLD) return;

    this.changeImage(swipeDistance > 0 ? 1 : -1);
    this.resetAutoSlide();
  }

  private announceImageChange(): void {
    const announcement = `${this.getTranslation('image')} ${this.imageIndex + 1} ${this.getTranslation('of')} ${this.projectDescription?.imageUrls?.length || 0}`;

    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = announcement;

    document.body.appendChild(announcer);
    setTimeout(() => document.body.removeChild(announcer), 1000);
  }
}
