import {HttpClient} from '@angular/common/http';
import {FoodJournalEntry} from "../models/food-journal-entry";
import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import DateUtils from "../DateUtils";

@Injectable({
    providedIn: 'root'
})
export class FoodJournalEntryService {
    foodLogs: FoodJournalEntry[] = [];

    baseURL: string = environment.baseUrl;

    constructor(
        private http: HttpClient
    ) {
    }

    saveFoodEntry(foodEntryData: FoodJournalEntry) {
        return this.http.post(`${this.baseURL}/food-journal-entry`, foodEntryData);
    }

    fetchFoodJournalEntries(date: Date){
        const formattedDate = DateUtils.getDateStringFromDatetime(date);
        console.log(`${this.baseURL}/food-journal-entries/date?date=${formattedDate}`)
        return this.http.get(`${this.baseURL}/food-journal-entries/date?date=${formattedDate}`)

    }
}

