import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {faFloppyDisk} from "@fortawesome/free-solid-svg-icons";
import DateUtils from "../shared/DateUtils";
import {FoodJournalEntry} from "../shared/models/food-journal-entry";
import {JournalCategory} from "../shared/models/journal-category";


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
    errMessage: string[] = [];
    alertDisplay = false;
    quickFoodAddForm = this.formBuilder.group({
        foodName: "",
        quickCalories: '',
        dayDate: this.day,
        time: this.time,
        thoughtsTextArea: ""
    });

    onSubmit() {
        this.errMessage = this.validateQuickFoodJournalEntryCalculatorForms(this.quickFoodAddForm);
        console.log(this.quickFoodAddForm);
        if (this.errMessage.length > 0) {
            this.alertDisplay = true;
        } else {

            console.warn('food saved : ', this.quickFoodAddForm.value);
            const date = DateUtils.getUTCDateStringFromDateAndTime(this.quickFoodAddForm.value.dayDate, this.quickFoodAddForm.value.time);
            const entryData: FoodJournalEntry =
                new FoodJournalEntry(null,
                    date,
                    null,
                    null,
                    Number(this.quickFoodAddForm.value.quickCalories),
                    this.quickFoodAddForm.value.thoughtsTextArea ? this.quickFoodAddForm.value.thoughtsTextArea : "",
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
                time: this.time,
                thoughtsTextArea: ""
            });
        }
    }

    validateQuickFoodJournalEntryCalculatorForms(quickFoodAddForm: FormGroup): string[] {
        var errMessage: string[] = []
        if (quickFoodAddForm.value.foodName == "") {
            errMessage.push("The food name is required");
        }
        if (quickFoodAddForm.value.dayDate == "") {
            errMessage.push("The date is required");
        }
        if (quickFoodAddForm.value.time == "") {
            errMessage.push("The time is required");
        }
        if (quickFoodAddForm.value.quickCalories == "") {
            errMessage.push("The calorie count is required");
        }
        return errMessage;
    }
}
