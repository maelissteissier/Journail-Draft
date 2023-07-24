import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFoodEntryModalComponent } from './delete-food-entry-modal.component';

describe('DeleteFoodEntryModalComponent', () => {
  let component: DeleteFoodEntryModalComponent;
  let fixture: ComponentFixture<DeleteFoodEntryModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteFoodEntryModalComponent]
    });
    fixture = TestBed.createComponent(DeleteFoodEntryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
