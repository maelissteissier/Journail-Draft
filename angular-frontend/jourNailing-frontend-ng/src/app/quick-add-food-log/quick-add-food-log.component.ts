import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {faFloppyDisk} from "@fortawesome/free-solid-svg-icons";
import DateUtils from "../shared/DateUtils";
import {FoodJournalEntry, JournalCategory} from "../add-food-journal-entry/food-journal-entry";


@Component({
    selector: 'app-quick-add-food-log',
    templateUrl: './quick-add-food-log.component.html',
    styleUrls: ['./quick-add-food-log.component.scss']
})
export class QuickAddFoodLogComponent {
    constructor(private formBuilder: FormBuilder) {
    }

    @Output() saveFoodEntry: EventEmitter<any> = new EventEmitter<any>();
    faFloppyDisk = faFloppyDisk;
    now = new Date();
    day = DateUtils.getDateStringFromDatetime(this.now);
    time = DateUtils.getTimeStringFromDatetime(this.now);

    quickFoodAddForm = this.formBuilder.group({
        foodName: "",
        quickCalories: '',
        dayDate: this.day,
        time: this.time
    });

    onSubmit(){
        console.warn('food saved : ', this.quickFoodAddForm.value);
        const date = DateUtils.getUTCDateStringFromDateAndTime(this.quickFoodAddForm.value.dayDate, this.quickFoodAddForm.value.time);
        const entryData: FoodJournalEntry =
            new FoodJournalEntry(null,
                date,
                null,
                null,
                Number(this.quickFoodAddForm.value.quickCalories),
                "",
                this.quickFoodAddForm.value.foodName ? this.quickFoodAddForm.value.foodName : "",
                null,
                new JournalCategory(1, "food"));

        this.saveFoodEntry.emit(entryData);

        this.now = new Date();
        this.day = DateUtils.getDateStringFromDatetime(this.now);
        this.time = DateUtils.getTimeStringFromDatetime(this.now);
        this.quickFoodAddForm = this.formBuilder.group({
            foodName: "",
            quickCalories: '',
            dayDate: this.day,
            time: this.time
        });
    }
}
