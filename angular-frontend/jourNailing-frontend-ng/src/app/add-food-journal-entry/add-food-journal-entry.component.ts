import {Component} from '@angular/core';


@Component({
    selector: 'app-add-food-journal-entry',
    templateUrl: './add-food-journal-entry.component.html',
    styleUrls: ['./add-food-journal-entry.component.scss'],
})

export class AddFoodJournalEntryComponent {
    quickAdd: boolean = false;

    enableQuickAdd(): void {
        this.quickAdd = true;
    }

    disableQuickAdd(): void {
        this.quickAdd = false;
    }
}
