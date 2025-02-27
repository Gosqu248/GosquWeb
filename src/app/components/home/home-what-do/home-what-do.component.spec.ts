import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWhatDoComponent } from './home-what-do.component';

describe('HomeWhatDoComponent', () => {
  let component: HomeWhatDoComponent;
  let fixture: ComponentFixture<HomeWhatDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeWhatDoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeWhatDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
