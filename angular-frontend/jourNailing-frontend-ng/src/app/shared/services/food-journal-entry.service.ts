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
        return this.http.post(`${this.baseURL}/api/food-journal-entry`, foodEntryData);
    }

    fetchFoodJournalEntries(date: Date){
        const formattedDate = DateUtils.getDateStringFromDatetime(date);
        return this.http.get(`${this.baseURL}/api/food-journal-entries/date?date=${formattedDate}`)

    }

    editFoodJournalEntry(foodEntryData: FoodJournalEntry){
        return this.http.put(`${this.baseURL}/api/food-journal-entry/${foodEntryData.id}`, foodEntryData);
    }

    deleteFoodJournalEntry(id: number | null){
        return this.http.delete(`${this.baseURL}/api/food-journal-entry/${id}`)
    }
}

