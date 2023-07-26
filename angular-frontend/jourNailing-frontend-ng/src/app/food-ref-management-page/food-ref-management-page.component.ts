import {Component} from '@angular/core';
import {FoodRef} from "../shared/models/food-ref";
import {ActivatedRoute, Router} from "@angular/router";
import {Page} from "../shared/models/page";

@Component({
    selector: 'app-food-ref-management-page',
    templateUrl: './food-ref-management-page.component.html',
    styleUrls: ['./food-ref-management-page.component.scss']
})
export class FoodRefManagementPageComponent {
    constructor(private route: ActivatedRoute, private router: Router) {
    }

    isAddFoodRefModalOpen: boolean = false;
    newFoodRef!: FoodRef;
    editFood: boolean = true;
    page:Page = Page.FOOD_REF;


    closeAddFoodRefModal() {
        this.isAddFoodRefModalOpen = false;
        this.reloadCurrentComponent();
    }

    openAddFoodRefModal() {
        this.isAddFoodRefModalOpen = true;
    }


    handleRowClicked(data: FoodRef) {
        this.newFoodRef = data;
        this.openAddFoodRefModal();
    }

    reloadCurrentComponent() {
        const currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
        });
    }
}
