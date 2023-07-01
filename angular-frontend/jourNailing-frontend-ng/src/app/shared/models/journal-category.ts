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
