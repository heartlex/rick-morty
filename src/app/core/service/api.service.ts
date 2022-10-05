import { Injectable } from '@angular/core';
import { Character, Episode, Info, QueryParam } from '../models/types';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';


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

  getEpisodes(episodes: string[]): Observable<string[]> {
    return this.http.get<Episode[]>("https://rickandmortyapi.com/api/episode/" + episodes.toString())
      .pipe(
        map((episodes: Episode[] | Episode) =>{
          if (Array.isArray(episodes)) {
            return episodes.map(episode => episode.episode)
          } else {
            return new Array<string>(episodes.episode);
          }
        })
    );
  }
}
