import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Character, QueryParam } from '../../core/models/types';
import { ApiService } from '../../core/service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  characters$ = this.apiService.getCharacters();
  favouriteCharacters: Character[] = [];

  showModal = false;
  detailCharacter: Character | undefined;

  constructor(private apiService: ApiService) {
  }

  navigateCharachters(url: string | null | undefined): void {
    if (url) {
      this.characters$ = this.apiService.getCharacters(url);
    }
  }

  searchCharacter(characterName: string): void {
    const param: QueryParam = {key: 'name', value: characterName}
    this.apiService.getCharacters(undefined, param)
    .subscribe({
      next: resultChar => {
        this.characters$ = of(resultChar)
      },
      error: (e: HttpErrorResponse) => {
        alert(`${e.status}: ${e.error.error}`);
      }
    })
  }

  toggleFavouriteCharacter(c: Character) {
    if (this.favouriteCharacters.some(fv => fv.id === c.id)) {
      this.favouriteCharacters = this.favouriteCharacters.filter(favouriteC => favouriteC.id !== c.id);
    }
    else{
      this.favouriteCharacters.push(c);
    }
  }

  showDetail(c: Character) {
    this.detailCharacter = c;
    this.showModal = true;
  }



}
