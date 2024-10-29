import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private selectedCity: string = '';

  constructor() {
    window.addEventListener('beforeunload', () => {
      this.save('field_offices', '');
    });
  }

  public save(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public get(key: string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  public getSelectedCity(): string {
    return this.selectedCity;
  }

  public setSelectedCity(city: string): void {
    this.selectedCity = city;
    this.save('field_offices', city);
  }
}
