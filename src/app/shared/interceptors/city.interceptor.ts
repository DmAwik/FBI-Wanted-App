import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { CityService } from '../services/city.service';
import { SelectOption } from '../interfaces/edit-options-interface';

@Injectable()
export class CityInterceptor implements HttpInterceptor {
  constructor(private cityService: CityService, private localStorageService: LocalStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const selectedCity = this.localStorageService.getSelectedCity();
    const cities = this.cityService.getCities();
    const modifiedRequest = request.clone({
      params: request.params.set('field_offices', selectedCity),
    });
    return next.handle(modifiedRequest).pipe(
      tap((event) => {
        if (event instanceof HttpResponse && Array.isArray(event.body.items)) {
          event.body.items.forEach((item: any) => {
            if (item.field_offices && Array.isArray(item.field_offices)) {
              item.field_offices.forEach((city: string) => {
                const cityObject: SelectOption = {
                  value: city,
                  label: city,
                };
                if (!cities.includes(cityObject)) {
                  this.cityService.addCity(cityObject);
                }
              });
            }
          });
        }
      }),
    );
  }
}
