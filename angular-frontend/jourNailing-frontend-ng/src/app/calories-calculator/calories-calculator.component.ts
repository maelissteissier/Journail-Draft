import {Component, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from "rxjs";

@Component({
    selector: 'app-calories-calculator',
    templateUrl: './calories-calculator.component.html',
    styleUrls: ['./calories-calculator.component.scss']
})
export class CaloriesCalculatorComponent implements OnChanges {

    @Input() formData: any;
    // @Output() getCaloriesCalculator: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
    caloriesCalculatorForm: FormGroup;
    calculateCaloriesFromWantedQuantity: boolean = true;
    placeholderWantedQuantity = "Exemple : 234";
    placeholderWantedCalories = "--";
    private subscriptions: Subscription[] = [];

    constructor(private formBuilder: FormBuilder) {
        this.caloriesCalculatorForm = this.formBuilder.group({
            quantityTypeEntry: "",
            originalQuantity: "",
            originalCalories: "",
            wantedQuantity: {value: "", disabled: false},
            wantedCalories: {value: "", disabled: true}
        });


    }

    ngOnInit() {
        this.subscribeToFormChanges();
    }

    ngOnDestroy() {
        this.unsubscribeFromFormChanges();
    }

    private subscribeToFormChanges() {
        // Calculator
        const originalQuantityControl = this.caloriesCalculatorForm.get('originalQuantity');
        const originalCaloriesControl = this.caloriesCalculatorForm.get('originalCalories');
        const wantedQuantityControl = this.caloriesCalculatorForm.get('wantedQuantity');
        const wantedCaloriesControl = this.caloriesCalculatorForm.get('wantedCalories');

        if (originalQuantityControl) {
            this.subscriptions.push(
                originalQuantityControl.valueChanges.subscribe((originQuantity) => {
                    if (this.calculateCaloriesFromWantedQuantity && wantedQuantityControl?.value !== 0 && wantedQuantityControl?.value !== "") {
                        wantedCaloriesControl?.setValue(((originalCaloriesControl?.value / originQuantity) * wantedQuantityControl?.value).toFixed(2));
                    } else if (!this.calculateCaloriesFromWantedQuantity && originalQuantityControl?.value != 0 && originalQuantityControl?.value != "") {
                        wantedQuantityControl?.setValue((wantedCaloriesControl?.value / (originalCaloriesControl?.value / originQuantity)).toFixed(2));
                    }
                })
            )
        }

        if (originalCaloriesControl) {
            this.subscriptions.push(
                originalCaloriesControl.valueChanges.subscribe((originalCalories) => {
                    if (this.calculateCaloriesFromWantedQuantity && wantedQuantityControl?.value !== 0 && wantedQuantityControl?.value !== "") {
                        wantedCaloriesControl?.setValue(((originalCalories / originalQuantityControl?.value) * wantedQuantityControl?.value).toFixed(2));
                    } else if (!this.calculateCaloriesFromWantedQuantity && originalQuantityControl?.value != 0 && originalQuantityControl?.value != "") {
                        wantedQuantityControl?.setValue((wantedCaloriesControl?.value / (originalCalories / originalQuantityControl?.value)).toFixed(2));
                    }
                })
            )
        }
        if (wantedQuantityControl) {
            this.subscriptions.push(
                wantedQuantityControl.valueChanges.subscribe((wantedQuantity) => {
                    if (this.calculateCaloriesFromWantedQuantity && wantedQuantity !== 0 && wantedQuantity !== "") {
                        wantedCaloriesControl?.setValue(Math.round((originalCaloriesControl?.value / originalQuantityControl?.value) * wantedQuantity));
                    }
                })
            )
        }
        if (wantedCaloriesControl) {
            this.subscriptions.push(
                wantedCaloriesControl.valueChanges.subscribe((wantedCalories) => {
                    if (!this.calculateCaloriesFromWantedQuantity && originalQuantityControl?.value !== 0 && originalQuantityControl?.value !== "") {
                        wantedQuantityControl?.setValue((wantedCalories / (originalCaloriesControl?.value / originalQuantityControl?.value)).toFixed(2));
                    }
                })
            )
        }
    }

    private unsubscribeFromFormChanges() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
        this.subscriptions = [];
    }

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

    // emitFormContent() {
    //     this.getCaloriesCalculator.emit(this.caloriesCalculatorForm);
    // }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes['formData']);
        if (changes['formData'] && this.formData) {
            const newFormData = changes['formData'].currentValue;
            this.caloriesCalculatorForm = this.formBuilder.group({
                quantityTypeEntry: newFormData.value.quantityTypeEntry,
                originalQuantity: newFormData.value.originalQuantity,
                originalCalories: newFormData.value.originalCalories,
                wantedQuantity: {value: "", disabled: !this.calculateCaloriesFromWantedQuantity},
                wantedCalories: {value: "", disabled: this.calculateCaloriesFromWantedQuantity}
            });
            this.unsubscribeFromFormChanges();
            this.subscribeToFormChanges();
        }
    }

    resetForm() {
        this.caloriesCalculatorForm.reset(); // Reset the form to its initial state
    }
}
