import {Component} from '@angular/core';

import DateUtils from "../shared/DateUtils";

@Component({
    selector: 'app-calculator-add-food-log',
    templateUrl: './calculator-add-food-log.component.html',
    styleUrls: ['./calculator-add-food-log.component.scss']
})
export class CalculatorAddFoodLogComponent {
    now = new Date();
    day = DateUtils.getDateStringFromDatetime(this.now);
    time = DateUtils.getTimeStringFromDatetime(this.now);

}
