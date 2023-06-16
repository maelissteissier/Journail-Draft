import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-calories-calculator',
    templateUrl: './calories-calculator.component.html',
    styleUrls: ['./calories-calculator.component.scss']
})
export class CaloriesCalculatorComponent {
    constructor(private formBuilder: FormBuilder) {
        this.caloriesCalculatorForm = this.formBuilder.group({
            quantityTypeEntry: "",
            originalQuantity: "",
            originalCalories: "",
            wantedQuantity: {value: "", disabled: false},
            wantedCalories: {value: "", disabled: true}
        });

        this.caloriesCalculatorForm.valueChanges.subscribe(() => {
            this.emitFormContent();
        });

        // Calculator
        const originalQuantityControl = this.caloriesCalculatorForm.get('originalQuantity')
        const originalCaloriesControl = this.caloriesCalculatorForm.get('originalCalories')
        const wantedQuantityControl = this.caloriesCalculatorForm.get('wantedQuantity');
        const wantedCaloriesControl = this.caloriesCalculatorForm.get('wantedCalories');

        originalQuantityControl?.valueChanges.subscribe((originQuantity) => {
            if (this.calculateCaloriesFromWantedQuantity && wantedQuantityControl?.value !== 0 && wantedQuantityControl?.value !== "") {
                wantedCaloriesControl?.setValue(((originalCaloriesControl?.value / originQuantity) * wantedQuantityControl?.value).toFixed(2));
            } else if (!this.calculateCaloriesFromWantedQuantity && originalQuantityControl?.value  != 0  && originalQuantityControl?.value != ""){
                wantedQuantityControl?.setValue((wantedCaloriesControl?.value / (originalCaloriesControl?.value / originQuantity)).toFixed(2));
            }
        });

        originalCaloriesControl?.valueChanges.subscribe((originalCalories) => {
            if (this.calculateCaloriesFromWantedQuantity && wantedQuantityControl?.value !== 0 && wantedQuantityControl?.value !== "") {
                wantedCaloriesControl?.setValue(((originalCalories / originalQuantityControl?.value) * wantedQuantityControl?.value).toFixed(2));
            } else if (!this.calculateCaloriesFromWantedQuantity && originalQuantityControl?.value  != 0  && originalQuantityControl?.value != ""){
                wantedQuantityControl?.setValue((wantedCaloriesControl?.value / (originalCalories / originalQuantityControl?.value)).toFixed(2));
            }
        });

        wantedQuantityControl?.valueChanges.subscribe((wantedQuantity) => {
            if (this.calculateCaloriesFromWantedQuantity && wantedQuantity !== 0 && wantedQuantity !== "") {
                wantedCaloriesControl?.setValue(Math.round((originalCaloriesControl?.value / originalQuantityControl?.value) * wantedQuantity));
            }
        })

        wantedCaloriesControl?.valueChanges.subscribe((wantedCalories) => {
            if (!this.calculateCaloriesFromWantedQuantity && originalQuantityControl?.value  !== 0  && originalQuantityControl?.value !== ""){
                wantedQuantityControl?.setValue((wantedCalories / (originalCaloriesControl?.value / originalQuantityControl?.value)).toFixed(2));
            }

        })
    }

    @Output() getCaloriesCalculator: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
    caloriesCalculatorForm: FormGroup;
    calculateCaloriesFromWantedQuantity: boolean = true;
    placeholderWantedQuantity = "Exemple : 234";
    placeholderWantedCalories = "--";

    enableCalculateCaloriesFromWantedQuantity(): void {
        this.calculateCaloriesFromWantedQuantity = true;
        this.caloriesCalculatorForm.get("wantedQuantity")?.enable();
        this.caloriesCalculatorForm.get("wantedCalories")?.disable();
        this.placeholderWantedQuantity = "Exemple : 234";
        this.placeholderWantedCalories = "--";

    }

    enableCalculateQuantityFromWantedCalories(): void {
        this.calculateCaloriesFromWantedQuantity = false;
        this.caloriesCalculatorForm.get("wantedQuantity")?.disable();
        this.caloriesCalculatorForm.get("wantedCalories")?.enable();
        this.placeholderWantedQuantity = "--";
        this.placeholderWantedCalories = "Exemple : 234";
    }

    emitFormContent() {
        this.getCaloriesCalculator.emit(this.caloriesCalculatorForm);
    }


}
