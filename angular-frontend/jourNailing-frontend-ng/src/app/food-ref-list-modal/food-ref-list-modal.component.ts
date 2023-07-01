import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FoodRef} from "../shared/models/food-ref";

@Component({
    selector: 'app-food-ref-list-modal',
    templateUrl: './food-ref-list-modal.component.html',
    styleUrls: ['./food-ref-list-modal.component.scss']
})
export class FoodRefListModalComponent {
    @Output() rowClicked: EventEmitter<any> = new EventEmitter<any>();
    @Output() onHide = new EventEmitter<void>();
    @Input() show!: boolean;
    search: string = "";
    faCheck = faCheck;
    faXmark = faXmark;


    handleBackdropClick() {
        this.onHide.emit();
    }

    handleContentClick(event: MouseEvent) {
        event.stopPropagation();
    }

    handleSearchChange(value: string) {
        this.search = value;
    }

    handleRowClicked(data: FoodRef) {
        this.rowClicked.emit(data);
  }
}
