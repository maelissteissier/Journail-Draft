import {Component, OnInit} from '@angular/core';
import {FoodJournalEntryService} from "../shared/services/food-journal-entry.service";
import DateUtils from "../shared/DateUtils";
import {FoodJournalEntry} from "../shared/models/food-journal-entry";
import {faChevronLeft, faChevronRight, faCirclePlus} from "@fortawesome/free-solid-svg-icons";

interface LunchType {
    timeMin: string;
    timeMax: string;
    tag: string;
}

interface EntryDisplay {
    time: string;
    name: string;
    quantity: number | null;
    quantityType: string | null;
    calories: number;
    thoughts: string;
}

const LUNCH_TYPE: { [key: string]: LunchType } = {
    MORNING: {timeMin: '00:00', timeMax: '11:30', tag: 'Matin'},
    NOON: {timeMin: '11:30', timeMax: '14:30', tag: 'Midi'},
    AFTERNOON: {timeMin: '14:30', timeMax: '17:45', tag: 'Après-midi'},
    EVENING: {timeMin: '17:45', timeMax: '23:59', tag: 'Soir'},
}

@Component({
    selector: 'app-display-food-journal',
    templateUrl: './display-food-journal.component.html',
    styleUrls: ['./display-food-journal.component.scss']
})
export class DisplayFoodJournalComponent implements OnInit {
    constructor(private foodJournalEntryService: FoodJournalEntryService) {
    }

    day: Date = new Date();
    displayDay = DateUtils.getDateStringFromDatetime(this.day);
    foodEntries: FoodJournalEntry[] = [];
    lunchInfos: { "lunchType": LunchType, "entries": EntryDisplay[], "totalLunchCals": number }[] = [];
    totalCalories: number = 0;
    faChevronLeft = faChevronLeft;
    faChevronRight = faChevronRight;
    faCirclePlus = faCirclePlus;

    ngOnInit() {
        this.setFoodJournalInfos(new Date());
    }


    getFoodEntriesByLunchType(lunchType: LunchType, day: Date): EntryDisplay[] {
        const lunchTypeMinDate = DateUtils.changeTimeOfDatetime(day, lunchType.timeMin);
        const lunchTypeMaxDate = DateUtils.changeTimeOfDatetime(day, lunchType.timeMax);

        return this.foodEntries.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (dateA > dateB){
                return 1
            } else if (dateA < dateB){
                return -1
            }else{
                return 0
            }
        })
            .filter(entry => {
                const entryDate = new Date(entry.date);
                return entryDate >= lunchTypeMinDate && entryDate < lunchTypeMaxDate
            })
            .map(lunchEntry => {
                const entryDate = new Date(lunchEntry.date);
                const formattedTime = DateUtils.getTimeStringFromDatetime(entryDate);
                return {
                    time: formattedTime,
                    name: lunchEntry.name,
                    quantity: lunchEntry.quantity,
                    quantityType: lunchEntry.quantity_type,
                    calories: lunchEntry.calories,
                    thoughts: lunchEntry.thoughts,
                }
            });
    }

    getCellCaloriesByLunchType(lunchType: LunchType, day: Date) {
        const lunchTypeMinDate = DateUtils.changeTimeOfDatetime(day, lunchType.timeMin);
        const lunchTypeMaxDate = DateUtils.changeTimeOfDatetime(day, lunchType.timeMax);

        return this.foodEntries
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .filter((entry) => {
                const entryDate = new Date(entry.date);
                return entryDate >= lunchTypeMinDate && entryDate < lunchTypeMaxDate;
            })
            .reduce((acc, currVal) => acc + currVal.calories, 0);
    }

    getTotalCalories() {
        return this.foodEntries.reduce((acc, currVal) => acc + currVal.calories, 0);
    }

    addOneDaytoDay(){
        this.day.setDate(this.day.getDate() + 1);
        this.setFoodJournalInfos(this.day)
    }

    subOneDaytoDay(){
        this.day.setDate(this.day.getDate() - 1);
        this.setFoodJournalInfos(this.day);
    }

    setFoodJournalInfos(newDay: Date){
        this.day = newDay;
        this.displayDay = DateUtils.getDateStringFromDatetime(this.day);
        this.foodJournalEntryService.fetchFoodJournalEntries(this.day).subscribe({
            next: (response) => {
                console.log('Food entries retrieved:', response);
                this.foodEntries = response as FoodJournalEntry[];
                const lunchTypes = Object.keys(LUNCH_TYPE);
                this.lunchInfos = [];
                lunchTypes.forEach((lunchType) => {
                    let entries = this.getFoodEntriesByLunchType(LUNCH_TYPE[lunchType], this.day);
                    let calories = this.getCellCaloriesByLunchType(LUNCH_TYPE[lunchType], this.day)
                    this.lunchInfos.push({"lunchType": LUNCH_TYPE[lunchType], "entries": entries, "totalLunchCals": calories});
                });
                this.totalCalories = this.getTotalCalories();
            },
            error: (error) => {
                console.error('Error fetching Food Journal Entries:', error);
            }
        });
    }
}
