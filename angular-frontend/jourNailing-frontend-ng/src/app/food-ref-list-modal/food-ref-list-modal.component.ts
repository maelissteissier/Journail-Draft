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
    faCheck = faCheck;
    faXmark = faXmark;
    isModal: boolean = true;


    handleBackdropClick() {
        this.onHide.emit();
    }

    handleRowClicked(data: FoodRef) {
        this.rowClicked.emit(data);
        this.onHide.emit();
  }
}
