import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodRefListModalComponent } from './food-ref-list-modal.component';

describe('FoodRefListModalComponent', () => {
  let component: FoodRefListModalComponent;
  let fixture: ComponentFixture<FoodRefListModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodRefListModalComponent]
    });
    fixture = TestBed.createComponent(FoodRefListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
