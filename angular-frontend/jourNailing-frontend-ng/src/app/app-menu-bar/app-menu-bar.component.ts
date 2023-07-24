import {Component} from '@angular/core';
import {faBook, faCirclePlus, faPen, faHouseChimney} from '@fortawesome/free-solid-svg-icons'
import {Router} from "@angular/router";

@Component({
    selector: 'app-app-menu-bar',
    templateUrl: './app-menu-bar.component.html',
    styleUrls: ['./app-menu-bar.component.scss']
})
export class AppMenuBarComponent {
    constructor(private router: Router) {
    }

    faBook = faBook;
    faCirclePlus = faCirclePlus;
    faPen = faPen;
    faHouseChimney = faHouseChimney;

        handleButtonClick(): void {
        alert('Button clicked!');
        // Perform additional actions or logic here
    }

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
