import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FoodRefService} from "../shared/services/food-ref.service";
import {FoodRef} from "../shared/models/food-ref";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-food-ref-list',
    templateUrl: './food-ref-list.component.html',
    styleUrls: ['./food-ref-list.component.scss']
})
export class FoodRefListComponent {
    constructor(private foodRefService: FoodRefService, private formBuilder: FormBuilder) {
        this.searchFoodForm = this.formBuilder.group({
            searchFoodInput: ""
        });
        this.foodRefService.getFoodRef().subscribe((foodRefList) => {
            this.foodRefListRetrieved = foodRefList;
            this.foodRefList = foodRefList;
        });
        const searchFoodControl = this.searchFoodForm.get("searchFoodInput");
        searchFoodControl?.valueChanges?.subscribe((search) => {
            this.foodRefList = this.foodRefListRetrieved.filter(food => food.name.toLowerCase().includes(search.toLowerCase()))
        })
    }
    searchFoodForm: FormGroup;
    @Input() isModal!: boolean;

    @Output() rowClicked: EventEmitter<any> = new EventEmitter<any>();

    foodRefListRetrieved: FoodRef[] = [];
    foodRefList: FoodRef[] = [];

    onRowClick(data: FoodRef) {
        this.rowClicked.emit(data);
    }

}
