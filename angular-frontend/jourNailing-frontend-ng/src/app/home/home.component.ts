import {Component} from '@angular/core';
import {faBook, faCirclePlus, faMagnifyingGlass, faQuestion} from '@fortawesome/free-solid-svg-icons'
import {Router} from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    constructor(private router: Router) {
    }

    title = 'jourNailing-frontend-ng';
    faBook = faBook;
    faCirclePlus = faCirclePlus;
    faMagnifyingGlass = faMagnifyingGlass;
    faQuestion = faQuestion;

    handleButtonClick(): void {
        alert('Button clicked!');
        // Perform additional actions or logic here
    }

    goToAddFoodJournalEntry() {
        this.router.navigate(["add-food-journal-entry"])
    }
}
