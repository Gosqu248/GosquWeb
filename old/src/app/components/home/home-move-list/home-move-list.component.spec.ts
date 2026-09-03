import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMoveListComponent } from './home-move-list.component';

describe('HomeMoveListComponent', () => {
  let component: HomeMoveListComponent;
  let fixture: ComponentFixture<HomeMoveListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMoveListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMoveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
