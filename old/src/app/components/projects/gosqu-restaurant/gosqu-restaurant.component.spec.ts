import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GosquRestaurantComponent } from './gosqu-restaurant.component';

describe('GosquRestaurantComponent', () => {
  let component: GosquRestaurantComponent;
  let fixture: ComponentFixture<GosquRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GosquRestaurantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GosquRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
