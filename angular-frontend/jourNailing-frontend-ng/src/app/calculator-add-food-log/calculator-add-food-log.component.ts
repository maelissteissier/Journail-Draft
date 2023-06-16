import {Component, EventEmitter, Output} from '@angular/core';
import DateUtils from "../shared/DateUtils";
import {FoodJournalEntry, JournalCategory} from "../add-food-journal-entry/food-journal-entry";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {faFloppyDisk} from "@fortawesome/free-solid-svg-icons";
import {faFloppyDisk as farFloppyDisk} from "@fortawesome/free-regular-svg-icons";

@Component({
    selector: 'app-calculator-add-food-log',
    templateUrl: './calculator-add-food-log.component.html',
    styleUrls: ['./calculator-add-food-log.component.scss']
})
export class CalculatorAddFoodLogComponent {
    constructor(private formBuilder: FormBuilder) {
        this.caloriesCalculatorForm = this.formBuilder.group({
            quantityTypeEntry: "",
            originalQuantity: 0,
            originalCalories: 0,
            wantedQuantity: 0,
            wantedCalories: 0
        });
    }

    @Output() saveFoodEntry: EventEmitter<any> = new EventEmitter<any>();


    faFloppyDisk = faFloppyDisk;
    farFloppyDisk = farFloppyDisk;
    now = new Date();
    day = DateUtils.getDateStringFromDatetime(this.now);
    time = DateUtils.getTimeStringFromDatetime(this.now);
    caloriesCalculatorForm: FormGroup;
    addFoodForm = this.formBuilder.group({
        foodName: "",
        dayDate: this.day,
        time: this.time
    });
    errMessage: string[] = [];
    alertDisplay = false;

    handleCaloriesCalculatorFormChange(formContent: FormGroup) {
        this.caloriesCalculatorForm = formContent;
    }

    onSubmit() {
        this.validateFoodJournalEntryCalculatorForms(this.addFoodForm, this.caloriesCalculatorForm)
        console.warn('food saved : ', this.addFoodForm.value);
        const date = DateUtils.getUTCDateStringFromDateAndTime(this.addFoodForm.value.dayDate, this.addFoodForm.value.time);
        const entryData: FoodJournalEntry =
            new FoodJournalEntry(null,
                date,
                Number(this.caloriesCalculatorForm.value.wantedQuantity),
                this.caloriesCalculatorForm.value.quantityTypeEntry,
                Number(this.caloriesCalculatorForm.value.wantedCalories),
                "",
                this.addFoodForm.value.foodName ? this.addFoodForm.value.foodName : "",
                null,
                new JournalCategory(1, "food"));

        this.saveFoodEntry.emit(entryData);

        this.now = new Date();
        this.day = DateUtils.getDateStringFromDatetime(this.now);
        this.time = DateUtils.getTimeStringFromDatetime(this.now);
        this.addFoodForm = this.formBuilder.group({
            foodName: "",
            dayDate: this.day,
            time: this.time
        });
    }

    validateFoodJournalEntryCalculatorForms(addFoodForm: FormGroup, caloriesCalculatorForm:FormGroup): void {
        this.errMessage = []
        if (addFoodForm.value.foodName == "") {
            this.errMessage.push("The food name is required");
        }
        if (addFoodForm.value.dayDate == "") {
            this.errMessage.push("The date is required");
        }
        if (addFoodForm.value.time == "") {
            this.errMessage.push("The time is required");
        }
        addFoodForm.value.time
        if (caloriesCalculatorForm.value.wantedCalories == "") {
            this.errMessage.push("The calorie count is required");
        }

        this.alertDisplay = true;


    }
}
