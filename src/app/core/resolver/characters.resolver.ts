import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '../service/api.service';
import { Character, Info } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class CharactersResolver implements Resolve<Info<Character[]>> {

  constructor(private apiService: ApiService) {}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Info<Character[]>> {
    return this.apiService.getCharacters();
  }
}
