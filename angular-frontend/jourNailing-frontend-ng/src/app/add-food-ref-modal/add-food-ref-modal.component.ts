import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FoodRef} from "../shared/models/food-ref";
import {FoodRefService} from "../shared/services/food-ref.service";

@Component({
    selector: 'app-add-food-ref-modal',
    templateUrl: './add-food-ref-modal.component.html',
    styleUrls: ['./add-food-ref-modal.component.scss']
})
export class AddFoodRefModalComponent implements OnChanges {
    constructor(private formBuilder: FormBuilder, private foodRefService: FoodRefService) {
        this.addFoodRefForm = this.formBuilder.group({
            foodName: {value: '', disabled: true},
            quantityTypeEntry: {value: '', disabled: true},
            originalQuantity: {value: '', disabled: true},
            originalCalories: {value: '', disabled: true},
        });
    }

    @Output() onHide = new EventEmitter<void>();
    @Input() show!: boolean;
    @Input() foodRef!: FoodRef;
    faCheck = faCheck;
    faXmark = faXmark;
    addFoodRefForm!: FormGroup;
    errMessage: string[] = [];
    alertDisplay = false;
    isFoodRefSentSuccessToastShow: boolean = false;

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes['foodRef']);
        this.addFoodRefForm = this.formBuilder.group({
            foodName: this.foodRef.name,
            quantityTypeEntry: this.foodRef.quantity_type,
            originalQuantity: this.foodRef.original_quantity,
            originalCalories: this.foodRef.original_calory,
        });
    }

    onSaveFoodRef() {
        this.errMessage = this.validateFoodRefForm(this.addFoodRefForm);
        if (this.errMessage.length > 0) {
            this.alertDisplay = true;
        } else {
            const foodRefToSave = new FoodRef(
                null,
                Number(this.addFoodRefForm.value.originalCalories),
                Number(this.addFoodRefForm.value.originalQuantity),
                this.addFoodRefForm.value.foodName,
                this.addFoodRefForm.value.quantityTypeEntry
            );
            this.foodRefService.saveFoodRef(foodRefToSave).subscribe({
                next: (response) => {
                    console.log('Food reference added:', response);
                    this.isFoodRefSentSuccessToastShow = true;
                    setTimeout(() => {
                        this.isFoodRefSentSuccessToastShow = false;
                        this.onHide.emit();
                    }, 2000);
                },
                error: (error) => {
                    console.error('Error adding food reference:', error);
                    console.error('test', error.error.errors.errors);
                    for(let err of error.error.errors.errors){
                        this.errMessage.push(err);
                    }
                    this.alertDisplay = true;

                }
            });
        }

    }

    private validateFoodRefForm(foodRefForm: FormGroup): string[] {
        var errMessage: string[] = [];
        console.log(foodRefForm);
        if (foodRefForm.value.foodName == "") {
            errMessage.push("The food name is required");
        }
        if (foodRefForm.value.quantityTypeEntry == "") {
            errMessage.push("The quantity type is required");
        }
        if (foodRefForm.value.originalQuantity == "") {
            errMessage.push("The quantity reference is required");
        }
        if (foodRefForm.value.originalCalories == "") {
            errMessage.push("The calories reference are required");
        }
        return errMessage;
    }

}
