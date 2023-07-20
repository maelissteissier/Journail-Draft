import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayFoodJournalComponent } from './display-food-journal.component';

describe('DisplayFoodJournalComponent', () => {
  let component: DisplayFoodJournalComponent;
  let fixture: ComponentFixture<DisplayFoodJournalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayFoodJournalComponent]
    });
    fixture = TestBed.createComponent(DisplayFoodJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
