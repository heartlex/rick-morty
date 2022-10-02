import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, fromEvent, map, of } from 'rxjs';
import { Character, Info } from '../../core/models/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // @ts-ignore

  favouriteCharacters: Character[] = [];


  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }



  identify(index: number, character: Character): number {
    return character.id;
  }



  searchCharacter(characterName: string): void {
    this.http.get<Info<Character[]>>("https://rickandmortyapi.com/api/character?name=" + characterName)
    .subscribe({
      next: resultChar => {
        this.characters$ = of(resultChar)
      },
      error: (e: HttpErrorResponse) => {
        alert(`${e.status}: ${e.error.error}`);
      }
    })
  }

  showDetail(c: Character) {
    this.selectedCharacter = c;
    this.showModal = true;
  }
}
