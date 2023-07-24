import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodRefManagementPageComponent } from './food-ref-management-page.component';

describe('FoodRefManagementPageComponent', () => {
  let component: FoodRefManagementPageComponent;
  let fixture: ComponentFixture<FoodRefManagementPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodRefManagementPageComponent]
    });
    fixture = TestBed.createComponent(FoodRefManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
