import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodRefListComponent } from './food-ref-list.component';

describe('FoodRefListComponent', () => {
  let component: FoodRefListComponent;
  let fixture: ComponentFixture<FoodRefListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodRefListComponent]
    });
    fixture = TestBed.createComponent(FoodRefListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
