import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsctiptionsWrapperComponent } from './subsctiptions-wrapper.component';

describe('SubsctiptionsWrapperComponent', () => {
  let component: SubsctiptionsWrapperComponent;
  let fixture: ComponentFixture<SubsctiptionsWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubsctiptionsWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubsctiptionsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
