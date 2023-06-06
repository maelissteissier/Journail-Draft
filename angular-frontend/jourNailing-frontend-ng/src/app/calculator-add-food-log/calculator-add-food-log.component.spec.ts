import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorAddFoodLogComponent } from './calculator-add-food-log.component';

describe('CalculatorAddFoodLogComponent', () => {
  let component: CalculatorAddFoodLogComponent;
  let fixture: ComponentFixture<CalculatorAddFoodLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalculatorAddFoodLogComponent]
    });
    fixture = TestBed.createComponent(CalculatorAddFoodLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
