import {Component, EventEmitter, Output} from '@angular/core';
import {FoodRefService} from "./food-ref.service";
import {FoodRef} from "../shared/models/food-ref";

@Component({
    selector: 'app-food-ref-list',
    templateUrl: './food-ref-list.component.html',
    styleUrls: ['./food-ref-list.component.scss']
})
export class FoodRefListComponent {
    constructor(private foodRefService: FoodRefService) {
        this.foodRefService.getFoodRef().subscribe((foodRefList) => {
            this.foodRefList = foodRefList
        });
    }

    @Output() rowClicked: EventEmitter<any> = new EventEmitter<any>();

    foodRefList: FoodRef[] = [];

    onRowClick(data: FoodRef) {
        this.rowClicked.emit(data);
    }

}
