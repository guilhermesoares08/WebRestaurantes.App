import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../_models/Restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  baseUrl = 'http://localhost:5000/api/restaurant';

  constructor(private http: HttpClient) {

  }

  getAllRestaurant(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.baseUrl);
  }

  getRestaurantById(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.baseUrl}/${id}`);
  }

  getRestaurantByText(text: string): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.baseUrl}/getByText/${text}`);
  }

  postRestaurant(rest: Restaurant) {
    return this.http.post(`${this.baseUrl}`, rest);
  }

  putRestaurant(rest: Restaurant) {
    return this.http.put(`${this.baseUrl}/${rest.id}`, rest);
  }

  deleteRestaurant(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

   postUpload(file: File, name: string) {
    const fileToUplaod = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUplaod, name);

    return this.http.post(`${this.baseUrl}/upload`, formData);
  }  
}
