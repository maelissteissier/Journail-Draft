import { JournalCategory } from './journal-category';
import { FoodRef } from './food-ref';

export class FoodJournalEntry {
  id: number | null;
  date: string;
  quantity: number | null;
  quantity_type: string | null;
  calories: number;
  thoughts: string;
  name: string;
  food_ref: FoodRef | null;
  journal_category: JournalCategory;

  // Complete constructor
    constructor(
        id: number | null,
        date: string,
        quantity: number | null,
        quantity_type: string | null,
        calories: number,
        thoughts: string,
        name: string,
        food_ref: FoodRef | null,
        journal_category: JournalCategory
    ) {
    this.id = id;
    this.date = date;
    this.quantity = quantity;
    this.quantity_type = quantity_type;
    this.calories = calories;
    this.thoughts = thoughts;
    this.name = name;
    this.food_ref = food_ref;
    this.journal_category = journal_category;
  }

  static fromJson(json: any): FoodJournalEntry {
    const foodRef = json.food_ref ? FoodRef.fromJson(json.food_ref) : null;
    const journalCategory = JournalCategory.fromJson(json.journal_category);

    return new FoodJournalEntry(
      json.id,
      json.date,
      json.quantity,
      json.quantity_type,
      json.calories,
      json.thoughts,
      json.name,
      foodRef,
      journalCategory
    );
  }
}
