import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FoodJournalEntryService} from "../shared/services/food-journal-entry.service";
import {FoodJournalEntry} from "../shared/models/food-journal-entry";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import DateUtils from "../shared/DateUtils";
import {TOAST_LONG_TIMEOUT, TOAST_SHORT_TIMEOUT} from "../shared/timeouts-config";

@Component({
    selector: 'app-delete-food-entry-modal',
    templateUrl: './delete-food-entry-modal.component.html',
    styleUrls: ['./delete-food-entry-modal.component.scss']
})
export class DeleteFoodEntryModalComponent {
    constructor(private foodJournalEntryService: FoodJournalEntryService) {
    }

    @Output() onHide = new EventEmitter<void>();
    @Output() reloadParent = new EventEmitter<void>();
    @Input() show!: boolean;
    @Input() foodEntry!: FoodJournalEntry;
    @Input() isFoodEntryQuickAdd!: boolean;
    faCheck = faCheck;
    faXmark = faXmark;
    isFoodEntryDeleteSuccessToastShow: boolean = false;
    isFoodEntryDeleteFailToastShow: boolean = false;
    failMessage: string = "";

    deleteFoodEntry(foodEntryData: FoodJournalEntry) {
        this.foodJournalEntryService.deleteFoodJournalEntry(foodEntryData.id).subscribe(
            {
                next: (response) => {
                    this.isFoodEntryDeleteSuccessToastShow = true;
                    setTimeout(() => {
                        this.isFoodEntryDeleteSuccessToastShow = false;
                        this.onHide.emit();
                        this.reloadParent.emit();
                    }, TOAST_SHORT_TIMEOUT);

                },
                error: (error) => {
                    this.isFoodEntryDeleteFailToastShow = true;
                    this.failMessage = error.error.errors.reduce((acc: string, str: string) => {
                        return `${acc}\n${str}`;
                    });
                    setTimeout(() => {
                        this.isFoodEntryDeleteFailToastShow = false;
                        this.onHide.emit();
                        this.reloadParent.emit();
                    }, TOAST_LONG_TIMEOUT);
                }
            }
        );
    }

    getEntryTime(datestring: string): string {
        let date = new Date(datestring);
        return DateUtils.getTimeStringFromDatetime(date);
    }

    getEntryDay(datestring: string): string {
        let date = new Date(datestring);
        return DateUtils.getDateStringFromDatetime(date);
    }
}
