import {HttpClient} from '@angular/common/http';
import {FoodJournalEntry} from "../shared/models/food-journal-entry";
import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";

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
        this.http.post(`${this.baseURL}/food-journal-entry`, foodEntryData)
            .subscribe(
                {
                    next: (response) => {
                        // Handle the successful response here
                        console.log('Food entry added:', response);
                    },
                    error: (error) => {
                        // Handle the error response here
                        console.error('Error adding food entry:', error);
                    }
                }
            );
    }

// TODO remove those example lines
    getShippingPrices() {
        return this.http.get<{ type: string, price: number }[]>('/assets/shipping.json');
    }


}

