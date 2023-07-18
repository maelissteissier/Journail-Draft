import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFoodRefModalComponent } from './add-food-ref-modal.component';

describe('AddFoodModalComponent', () => {
  let component: AddFoodRefModalComponent;
  let fixture: ComponentFixture<AddFoodRefModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFoodRefModalComponent]
    });
    fixture = TestBed.createComponent(AddFoodRefModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
