import { Injectable } from '@angular/core';
import { SelectOption } from '../interfaces/edit-options-interface';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private cities: SelectOption[] = [];

  constructor() {
    this.loadCities();
  }

  public getCities(): SelectOption[] {
    return this.cities;
  }

  public addCity(city: SelectOption): void {
    if (!this.cities.includes(city)) {
      this.cities.push(city);
      this.saveCities();
    }
  }

  private saveCities(): void {
    localStorage.setItem('cities', JSON.stringify(this.cities));
  }

  private loadCities(): void {
    const citiesData = localStorage.getItem('cities');
    if (citiesData) {
      this.cities = JSON.parse(citiesData);
    }
  }
}
