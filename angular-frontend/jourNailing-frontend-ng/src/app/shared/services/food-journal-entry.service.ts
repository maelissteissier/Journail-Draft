import {HttpClient} from '@angular/common/http';
import {FoodJournalEntry} from "../models/food-journal-entry";
import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";

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
}

