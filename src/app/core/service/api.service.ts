import { Injectable } from '@angular/core';
import { Character, Info, QueryParam } from '../models/types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getCharacters(url?: string, param?: QueryParam): Observable<Info<Character[]>> {
    if (url) {
      return this.http.get<Info<Character[]>>(url)
    }
    if (param) {
      const queryParams = new URLSearchParams();
      queryParams.append(param.key, param.value);
      return this.http.get<Info<Character[]>>("https://rickandmortyapi.com/api/character?" + queryParams)
    }
    return this.http.get<Info<Character[]>>("https://rickandmortyapi.com/api/character")
  }
}
