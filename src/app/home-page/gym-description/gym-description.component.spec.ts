import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymDescriptionComponent } from './gym-description.component';

describe('GymDescriptionComponent', () => {
  let component: GymDescriptionComponent;
  let fixture: ComponentFixture<GymDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GymDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GymDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
