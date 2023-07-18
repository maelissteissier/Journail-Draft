import {Component, Input} from '@angular/core';
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-toast-message',
    templateUrl: './toast-message.component.html',
    styleUrls: ['./toast-message.component.scss']
})
export class ToastMessageComponent {
    @Input() textMuted!: string;
    @Input() toastMessage!: string;
    @Input() success!: boolean;
    @Input() show!: boolean;
    faCheck = faCheck;
    faXmark = faXmark;

}
