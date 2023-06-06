import { Component } from '@angular/core';
import {faFloppyDisk} from "@fortawesome/free-solid-svg-icons";
import {faFloppyDisk as farFloppyDisk} from "@fortawesome/free-regular-svg-icons";
import DateUtils from "../shared/DateUtils";


@Component({
  selector: 'app-quick-add-food-log',
  templateUrl: './quick-add-food-log.component.html',
  styleUrls: ['./quick-add-food-log.component.scss']
})
export class QuickAddFoodLogComponent {
    faFloppyDisk = faFloppyDisk;
    farFloppyDisk = farFloppyDisk;
    now = new Date();
    day = DateUtils.getDateStringFromDatetime(this.now);
    time = DateUtils.getTimeStringFromDatetime(this.now);
}
