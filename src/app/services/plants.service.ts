import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlantsService {
  endPoint = 'http://localhost:8080/plants';

  constructor(private httpClient: HttpClient) {}

  getPlants(filterParams: any): Observable<any> {
    let params = new HttpParams();

    if (filterParams.plantName) {
      params = params.set('plantName', filterParams.plantName);
    }
    if (filterParams.plantAge) {
      params = params.set('plantAge', filterParams.plantAge);
    }

    if (filterParams.sort) {
      params = params.set('sort', filterParams.sort);
    }

    return this.httpClient.get<any>(this.endPoint, { params });
  }

  deletePlant(plantId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.endPoint}/${plantId}`);
  }

  addPlant(newPlant: any): Observable<any> {
    return this.httpClient.post(this.endPoint, newPlant);
  }

  putPlant(plantId: number, updatedPlant: any): Observable<any> {
    return this.httpClient.put(`${this.endPoint}/${plantId}`, updatedPlant);
  }
}
