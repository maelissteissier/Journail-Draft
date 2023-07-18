import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FoodJournalEntry} from "../shared/models/food-journal-entry";
import {FoodJournalEntryService} from "../shared/services/food-journal-entry.service";
import {reduce} from "rxjs";


@Component({
    selector: 'app-add-food-journal-entry',
    templateUrl: './add-food-journal-entry.component.html',
    styleUrls: ['./add-food-journal-entry.component.scss'],
})

export class AddFoodJournalEntryComponent {
    constructor(private foodJournalEntryService: FoodJournalEntryService) {
    }

    quickAdd: boolean = false;
    isFoodEntrySentSuccessToastShow: boolean = false;
    isFoodEntrySentFailToastShow: boolean = false;
    failMessage: string = "";
    saveFoodSucceeded: boolean = false;

    enableQuickAdd(): void {
        this.quickAdd = true;
    }

    disableQuickAdd(): void {
        this.quickAdd = false;
    }

    saveFoodEntry(foodEntryData: FoodJournalEntry) {
        this.foodJournalEntryService.saveFoodEntry(foodEntryData).subscribe(
            {
                next: (response) => {
                    this.isFoodEntrySentSuccessToastShow = true;
                    setTimeout(() => {
                        this.isFoodEntrySentSuccessToastShow = false;
                    }, 3000);

                },
                error: (error) => {
                    this.isFoodEntrySentFailToastShow = true;
                    this.failMessage = error.error.errors.reduce((acc: string, str: string) => {
                        return `${acc}\n${str}`;
                    });
                    setTimeout(() => {
                        this.isFoodEntrySentFailToastShow = false;
                    }, 5000);
                }
            }
        );
    }
}
