import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  setItem(key: string, value: any): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const jsonValue = JSON.stringify(value);
        localStorage.setItem(key, jsonValue);
      } catch (error) {
        console.error('Error saving to localStorage', error);
      }
    }
  }

  getItem<T>(key: string): T | null {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const jsonValue = localStorage.getItem(key);
        return jsonValue ? JSON.parse(jsonValue) : null;
      } catch (error) {
        console.error('Error reading from localStorage', error);
        return null;
      }
    }
    return null;
  }

  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing from localStorage', error);
      }
    }
  }

  clear(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.clear();
      } catch (error) {
        console.error('Error clearing localStorage', error);
      }
    }
  }
}
