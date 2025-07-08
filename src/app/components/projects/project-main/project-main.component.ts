import { Component, Input, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { NgForOf, NgIf, NgClass } from "@angular/common";
import { RouterLink } from "@angular/router";
import { LanguageService } from '../../../services/language.service';
import { ProjectDescription } from '../../../interface/project-description';

@Component({
  selector: 'app-project-main',
  imports: [NgForOf, RouterLink, NgIf, NgClass],
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

  // Tech Stack methods for new design
  getTechIcon(tech: string): string {
    const techIcons: { [key: string]: string } = {
      // Frontend Technologies
      'Angular': 'fab fa-angular',
      'React': 'fab fa-react',
      'Vue': 'fab fa-vuejs',
      'JavaScript': 'fab fa-js-square',
      'TypeScript': 'fab fa-ts',
      'HTML': 'fab fa-html5',
      'CSS': 'fab fa-css3-alt',
      'SCSS': 'fab fa-sass',
      'Bootstrap': 'fab fa-bootstrap',
      'Tailwind': 'fab fa-tailwind',

      // Backend Technologies
      'Java': 'fab fa-java',
      'Spring Boot': 'fas fa-leaf',
      'Spring': 'fas fa-leaf',
      'Node.js': 'fab fa-node-js',
      'Python': 'fab fa-python',
      'C#': 'fab fa-csharp',
      '.NET': 'fab fa-dotnet',
      'PHP': 'fab fa-php',

      // Databases
      'MySQL': 'fas fa-database',
      'PostgreSQL': 'fas fa-database',
      'MongoDB': 'fas fa-database',
      'SQLite': 'fas fa-database',
      'Redis': 'fas fa-database',

      // Cloud & DevOps
      'AWS': 'fab fa-aws',
      'Docker': 'fab fa-docker',
      'Kubernetes': 'fas fa-dharmachakra',
      'Jenkins': 'fas fa-cogs',
      'GitHub': 'fab fa-github',
      'Git': 'fab fa-git-alt',

      // Additional Technologies
      'Gradle': 'fab fa-gradle',
      'Nginx': 'fab fa-nginx',
      'Webpack': 'fab fa-webpack',
      'Babel': 'fab fa-babel',
      'GraphQL': 'fab fa-graphql',
      'Firebase': 'fab fa-firebase',
    };
    return techIcons[tech] || 'fas fa-tools';
  }

  getTechCategory(tech: string): string {
    const techCategories: { [key: string]: string } = {
      // Frontend
      'Angular': 'Frontend',
      'React': 'Frontend',
      'Vue': 'Frontend',
      'JavaScript': 'Frontend',
      'TypeScript': 'Frontend',
      'HTML': 'Frontend',
      'CSS': 'Frontend',
      'SCSS': 'Frontend',
      'Bootstrap': 'Frontend',
      'Tailwind': 'Frontend',

      // Backend
      'Java': 'Backend',
      'Spring Boot': 'Backend',
      'Spring': 'Backend',
      'Node.js': 'Backend',
      'Python': 'Backend',
      'C#': 'Backend',
      '.NET': 'Backend',
      'PHP': 'Backend',

      // Database
      'MySQL': 'Database',
      'PostgreSQL': 'Database',
      'MongoDB': 'Database',
      'SQLite': 'Database',
      'Redis': 'Database',

      // Cloud & DevOps
      'AWS': 'Cloud',
      'Docker': 'DevOps',
      'Kubernetes': 'DevOps',
      'Jenkins': 'DevOps',
      'GitHub': 'Version Control',
      'Git': 'Version Control',

      // Mobile
      'Android': 'Mobile',
      'iOS': 'Mobile',
      'React Native': 'Mobile',
      'Flutter': 'Mobile',

      // Tools
      'IntelliJ': 'Tools',
      'VS Code': 'Tools',
      'Gradle': 'Build Tools',
      'Maven': 'Build Tools',
      'REST API': 'API',
      'GraphQL': 'API',
      'Figma': 'Design',
      'Photoshop': 'Design'
    };

    return techCategories[tech] || 'Technology';
  }

  getUniqueCategories(): string[] {
    if (!this.projectDescription?.techStack) return [];

    const categories = this.projectDescription.techStack.map(tech => this.getTechCategory(tech));
    return [...new Set(categories)];
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
