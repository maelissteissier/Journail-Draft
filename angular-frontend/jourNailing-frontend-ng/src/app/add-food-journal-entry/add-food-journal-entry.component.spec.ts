import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFoodJournalEntryComponent } from './add-food-journal-entry.component';

describe('AddFoodJournalEntryComponent', () => {
  let component: AddFoodJournalEntryComponent;
  let fixture: ComponentFixture<AddFoodJournalEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFoodJournalEntryComponent]
    });
    fixture = TestBed.createComponent(AddFoodJournalEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
