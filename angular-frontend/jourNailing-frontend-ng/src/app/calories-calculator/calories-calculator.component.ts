import {Component} from '@angular/core';
import {faFloppyDisk} from "@fortawesome/free-solid-svg-icons";
import {faFloppyDisk as farFloppyDisk} from "@fortawesome/free-regular-svg-icons";

@Component({
    selector: 'app-calories-calculator',
    templateUrl: './calories-calculator.component.html',
    styleUrls: ['./calories-calculator.component.scss']
})
export class CaloriesCalculatorComponent {
    faFloppyDisk = faFloppyDisk;
    farFloppyDisk = farFloppyDisk;
}
