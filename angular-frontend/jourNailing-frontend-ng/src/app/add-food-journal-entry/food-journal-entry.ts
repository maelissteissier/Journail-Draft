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

export class FoodRef {
  id: number | null;
  original_calory: number;
  original_quantity: number;
  name: string;
  quantity_type: string;

  constructor(
    id: number | null,
    original_calory: number,
    original_quantity: number,
    name: string,
    quantity_type: string
  ) {
    this.id = id;
    this.original_calory = original_calory;
    this.original_quantity = original_quantity;
    this.name = name;
    this.quantity_type = quantity_type;
  }

  static fromJson(json: any): FoodRef {
    return new FoodRef(
      json.id,
      json.original_calory,
      json.original_quantity,
      json.name,
      json.quantity_type
    );
  }
}

export class JournalCategory {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  static fromJson(json: any): JournalCategory {
    return new JournalCategory(json.id, json.name);
  }
}
