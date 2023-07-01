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
