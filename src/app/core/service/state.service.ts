import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Character } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private detailCharacter$ = new BehaviorSubject<Character | undefined>(undefined);

  constructor() { }

  setDetailCharacter(c: Character | undefined) {
    this.detailCharacter$.next(c);
  }
  getDetailCharacter(): Observable<Character | undefined> {
    return this.detailCharacter$;
  }
}
