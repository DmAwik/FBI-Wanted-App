import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectOption } from 'src/app/shared/interfaces/edit-options-interface';
import { CityService } from 'src/app/shared/services/city.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent implements OnInit {
  public cities!: SelectOption[];

  public citiesControl: FormControl = new FormControl('');

  constructor(private cityService: CityService, private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.cities = this.cityService.getCities();
    const selectedCity = this.localStorageService.getSelectedCity();
    this.citiesControl.setValue(selectedCity);

    this.citiesControl.valueChanges.subscribe((value) => {
      this.onCitySelected(value);
    });
  }

  public onCitySelected(city: string): void {
    this.localStorageService.setSelectedCity(city);
  }
}
