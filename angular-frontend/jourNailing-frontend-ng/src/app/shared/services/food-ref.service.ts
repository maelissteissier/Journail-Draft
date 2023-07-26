import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {FoodRef} from "../models/food-ref";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class FoodRefService {
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getFoodRef(): Observable<FoodRef[]> {
    const url = `${this.apiURL}/api/foodrefs`;
    return this.http.get<FoodRef[]>(url);
  }

  editFoodRef(foodRefData: FoodRef, id: any): Observable<FoodRef[]> {
    const url = `${this.apiURL}/api/foodref/${id}`;
    return this.http.put<FoodRef[]>(url, foodRefData);
  }

  saveFoodRef(foodRefData: FoodRef) : Observable<any> {
    return this.http.post(`${this.apiURL}/api/foodref`, foodRefData);
  }
}
