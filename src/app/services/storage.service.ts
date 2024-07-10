import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public addItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public getItem(key: any) {
    return localStorage.getItem(key);
  }

  public removeAll(): void {
    localStorage.clear();
  }
}
