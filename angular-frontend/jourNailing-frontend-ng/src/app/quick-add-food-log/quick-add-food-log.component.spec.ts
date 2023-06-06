import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickAddFoodLogComponent } from './quick-add-food-log.component';

describe('QuickAddFoodLogComponent', () => {
  let component: QuickAddFoodLogComponent;
  let fixture: ComponentFixture<QuickAddFoodLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuickAddFoodLogComponent]
    });
    fixture = TestBed.createComponent(QuickAddFoodLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
