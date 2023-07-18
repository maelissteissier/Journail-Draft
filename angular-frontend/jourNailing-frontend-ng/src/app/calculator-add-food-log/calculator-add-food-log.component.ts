import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import DateUtils from "../shared/DateUtils";
import {FoodJournalEntry} from "../shared/models/food-journal-entry";
import {FormBuilder, FormGroup} from "@angular/forms";
import {faFloppyDisk} from "@fortawesome/free-solid-svg-icons";
import {faFloppyDisk as farFloppyDisk} from "@fortawesome/free-regular-svg-icons";
import {JournalCategory} from "../shared/models/journal-category";
import {FoodRef} from "../shared/models/food-ref";
import {CaloriesCalculatorComponent} from "../calories-calculator/calories-calculator.component";

@Component({
    selector: 'app-calculator-add-food-log',
    templateUrl: './calculator-add-food-log.component.html',
    styleUrls: ['./calculator-add-food-log.component.scss']
})
export class CalculatorAddFoodLogComponent {
    constructor(private formBuilder: FormBuilder) {
        this.newFoodRef = new FoodRef(null, 0, 0, "", "")
    }

    @Output() saveFoodEntry: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild(CaloriesCalculatorComponent) caloriesCalculatorComponent!: CaloriesCalculatorComponent;


    faFloppyDisk = faFloppyDisk;
    farFloppyDisk = farFloppyDisk;
    now = new Date();
    day = DateUtils.getDateStringFromDatetime(this.now);
    time = DateUtils.getTimeStringFromDatetime(this.now);
    addFoodForm = this.formBuilder.group({
        foodName: "",
        dayDate: this.day,
        time: this.time,
        thoughtsTextArea: ""
    });
    errMessage: string[] = [];
    alertDisplay = false;
    isFoodRefListModalOpen: boolean = false;
    isAddFoodRefModalOpen: boolean = false;
    caloriesCalculatorForm!: FormGroup;
    newFoodRef: FoodRef;

    openFoodRefListModal() {
        this.isFoodRefListModalOpen = true;
    }

    openAddFoodRefModal() {
        const caloriesForm = this.caloriesCalculatorComponent.caloriesCalculatorForm
        this.newFoodRef = new FoodRef(null,
            caloriesForm.value.originalCalories,
            caloriesForm.value.originalQuantity,
            this.addFoodForm.value.foodName ? this.addFoodForm.value.foodName : "",

            caloriesForm.value.quantityTypeEntry)
        console.log(this.newFoodRef);
        this.isAddFoodRefModalOpen = true;
    }

    closeFoodRefListModal() {
        this.isFoodRefListModalOpen = false
    }

    closeAddFoodRefModal() {
        this.isAddFoodRefModalOpen = false;
    }

    handleFoodChoosenInModal(data: FoodRef) {
        this.caloriesCalculatorForm = this.formBuilder.group({
            quantityTypeEntry: data.quantity_type,
            originalQuantity: data.original_quantity,
            originalCalories: data.original_calory,
            wantedQuantity: 0,
            wantedCalories: 0
        });
        this.now = new Date();
        this.day = DateUtils.getDateStringFromDatetime(this.now);
        this.time = DateUtils.getTimeStringFromDatetime(this.now);
        this.addFoodForm = this.formBuilder.group({
            foodName: data.name,
            dayDate: this.day,
            time: this.time,
            thoughtsTextArea: this.addFoodForm.value.thoughtsTextArea ? this.addFoodForm.value.thoughtsTextArea : ""
        });
    }

    onSubmit() {
        const caloriesForm = this.caloriesCalculatorComponent.caloriesCalculatorForm
        console.log(caloriesForm);
        this.errMessage = this.validateFoodJournalEntryCalculatorForms(this.addFoodForm, caloriesForm)
        if (this.errMessage.length > 0) {
            this.alertDisplay = true;
        } else {
            console.warn('food saved : ', this.addFoodForm.value);
            const date = DateUtils.getUTCDateStringFromDateAndTime(this.addFoodForm.value.dayDate, this.addFoodForm.value.time);
            const foodRef = new FoodRef(
                null,
                Number(caloriesForm.controls["originalCalories"].value),
                Number(caloriesForm.controls["originalQuantity"].value),
                this.addFoodForm.value.foodName ? this.addFoodForm.value.foodName : "",
                caloriesForm.controls["quantityTypeEntry"].value
                )
            const entryData: FoodJournalEntry =
                new FoodJournalEntry(null,
                    date,
                    Number(caloriesForm.controls['wantedQuantity'].value),
                    caloriesForm.value.quantityTypeEntry,
                    Number(caloriesForm.controls['wantedCalories'].value),
                    this.addFoodForm.value.thoughtsTextArea ? this.addFoodForm.value.thoughtsTextArea : "",
                    this.addFoodForm.value.foodName ? this.addFoodForm.value.foodName : "",
                    foodRef,
                    new JournalCategory(1, "food"));

            this.saveFoodEntry.emit(entryData);

            this.now = new Date();
            this.day = DateUtils.getDateStringFromDatetime(this.now);
            this.time = DateUtils.getTimeStringFromDatetime(this.now);
            {
                this.addFoodForm = this.formBuilder.group({
                    foodName: "",
                    dayDate: this.day,
                    time: this.time,
                    thoughtsTextArea: ""
                });
            }
            this.caloriesCalculatorComponent.resetForm();
        }
    }

    validateFoodJournalEntryCalculatorForms(addFoodForm: FormGroup, caloriesCalculatorForm: FormGroup): string[] {
        var errMessage: string[] = [];
        if (addFoodForm.value.foodName == "") {
            errMessage.push("The food name is required");
        }
        if (addFoodForm.value.dayDate == "") {
            errMessage.push("The date is required");
        }
        if (addFoodForm.value.time == "") {
            errMessage.push("The time is required");
        }
        if (caloriesCalculatorForm.controls["wantedCalories"].value == "") {
            errMessage.push("The calorie count is required");
        }
        if (caloriesCalculatorForm.controls["originalCalories"].value == "") {
            errMessage.push("The calorie count reference is required");
        }
        if (caloriesCalculatorForm.controls["originalQuantity"].value == "") {
            errMessage.push("The quantity count reference is required");
        }
                if (caloriesCalculatorForm.controls["quantityTypeEntry"].value == "") {
            errMessage.push("The quantity type is required");
        }
        return errMessage;
    }
}
