import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FoodJournalEntry} from "./food-journal-entry";
import {FoodJournalEntryService} from "./food-journal-entry.service";


@Component({
    selector: 'app-add-food-journal-entry',
    templateUrl: './add-food-journal-entry.component.html',
    styleUrls: ['./add-food-journal-entry.component.scss'],
})

export class AddFoodJournalEntryComponent {
    constructor(private foodJournalEntryService: FoodJournalEntryService) {
    }

    quickAdd: boolean = false;

    enableQuickAdd(): void {
        this.quickAdd = true;
    }

    disableQuickAdd(): void {
        this.quickAdd = false;
    }

    saveFoodEntry(foodEntryData: FoodJournalEntry) {
        this.foodJournalEntryService.saveFoodEntry(foodEntryData)
    }
}
