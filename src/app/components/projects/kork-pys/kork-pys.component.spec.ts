import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorkPysComponent } from './kork-pys.component';

describe('KorkPysComponent', () => {
  let component: KorkPysComponent;
  let fixture: ComponentFixture<KorkPysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KorkPysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KorkPysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
