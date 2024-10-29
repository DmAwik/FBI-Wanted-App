import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {
  WantedItem,
  WantedListResponse,
  OriginalWantedItem,
  WantedListRequest,
} from './interfaces/fbi-wanted-list-response';

@Injectable({
  providedIn: 'root',
})
export class FbiWantedService {
  static i: number = 1;

  constructor(private http: HttpClient) {}

  public getWantedList(page: number, pageSize: number): Observable<WantedListResponse> {
    const url = `https://api.fbi.gov/@wanted?page=${page + 1}&pageSize=${pageSize}`;
    return this.http.get<WantedListRequest>(url).pipe(
      map((data: { items: OriginalWantedItem[]; total: number }) => {
        const mappedItems = data.items.map((item) =>
          // eslint-disable-next-line no-plusplus
          this.mapResponseToTemplateData(item, FbiWantedService.i++),
        );
        console.log(mappedItems);

        return { items: mappedItems, total: data.total };
      }),
    );
  }

  private mapResponseToTemplateData(response: OriginalWantedItem, recordId: number): WantedItem {
    return {
      id: recordId,
      title: response.title,
      images: response.images && response.images[0] && response.images[0].thumb,
      ageMin: response.age_min,
      ageMax: response.age_max,
      dateOfBirth: response.dates_of_birth_used && response.dates_of_birth_used['0'],
      heightMin: response.height_min,
      heightMax: response.height_max,
      weight: response.weight,
      gender: response.sex,
      placeOfBirth: response.place_of_birth,
      nationality: response.nationality,
      caution: response.caution,
      description: response.description,
      scarsAndMarks: response.scars_and_marks,
      race: response.race,
      files: response.files['0'] && response.files['0'].url,
      isEdited: false,
    };
  }
}
