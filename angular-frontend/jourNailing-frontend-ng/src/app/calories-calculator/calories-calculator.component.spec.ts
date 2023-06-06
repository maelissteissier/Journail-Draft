import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaloriesCalculatorComponent } from './calories-calculator.component';

describe('CaloriesCalculatorComponent', () => {
  let component: CaloriesCalculatorComponent;
  let fixture: ComponentFixture<CaloriesCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaloriesCalculatorComponent]
    });
    fixture = TestBed.createComponent(CaloriesCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
