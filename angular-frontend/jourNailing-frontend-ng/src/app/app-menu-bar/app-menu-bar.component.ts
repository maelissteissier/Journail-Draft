import {Component, Input} from '@angular/core';
import {faBook, faCirclePlus, faPen, faHouseChimney} from '@fortawesome/free-solid-svg-icons'
import {Router} from "@angular/router";
import {Page} from "../shared/models/page"

@Component({
    selector: 'app-app-menu-bar',
    templateUrl: './app-menu-bar.component.html',
    styleUrls: ['./app-menu-bar.component.scss']
})
export class AppMenuBarComponent {
    constructor(private router: Router) {
    }

    page = Page;
    faBook = faBook;
    faCirclePlus = faCirclePlus;
    faPen = faPen;
    faHouseChimney = faHouseChimney;
    @Input() selectedPage!: Page;


    goToAddFoodJournalEntry() {
        this.router.navigate(["add-food-journal-entry"])
    }

    goToFoodJournal(){
        this.router.navigate(["food-journal"])
    }

    goToHome(){
            this.router.navigate(["home"])
    }

    goToFoodRefList(){
            this.router.navigate(["food-ref-management"])
    }
}
