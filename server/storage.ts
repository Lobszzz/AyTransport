// Define your storage interface here
// Example:
// export interface IStorage {
//   getItem(id: string): Promise<Item | undefined>;
//   createItem(item: Omit<Item, 'id'>): Promise<Item>;
// }

export interface IStorage {
  // Add your storage methods here
}

export class MemStorage implements IStorage {
  constructor() {
    // Initialize your in-memory storage here
  }

  // Implement your storage methods here
}

export const storage = new MemStorage();
