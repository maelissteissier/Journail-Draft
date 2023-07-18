import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {FoodRef} from "../models/food-ref";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class FoodRefService {
  private baseURL = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getFoodRef(): Observable<FoodRef[]> {
    const url = `${this.baseURL}/foodrefs`;
    return this.http.get<FoodRef[]>(url);
  }

  saveFoodRef(foodRefData: FoodRef) : Observable<any> {
    return this.http.post(`${this.baseURL}/foodref`, foodRefData);
  }
}
