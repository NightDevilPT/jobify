import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Set an item in local storage
  setItem(key: string, value: any): void {
    try {
      const jsonValue = JSON.stringify(value); // Convert value to JSON string
      localStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  }

  // Get an item from local storage
  getItem<T>(key: string): T | null {
    try {
      const jsonValue = localStorage.getItem(key);
      return jsonValue ? JSON.parse(jsonValue) : null; // Parse JSON string to object
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return null;
    }
  }

  // Remove an item from local storage
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage', error);
    }
  }

  // Clear all items from local storage
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage', error);
    }
  }
}
