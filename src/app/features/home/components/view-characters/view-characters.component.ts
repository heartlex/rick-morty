import { Component, OnInit } from '@angular/core';
import { Character, Info } from '../../../../core/models/types';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-characters',
  templateUrl: './view-characters.component.html',
  styleUrls: ['./view-characters.component.scss']
})
export class ViewCharactersComponent implements OnInit {
  showModal = false;


  constructor() { }

  ngOnInit(): void {
  }

  navigateCharachters(url: string | null | undefined): void {
    if (url) {
      this.characters$ = this.http.get<Info<Character[]>>(url);
    }
  }

  selectCharacter(c: Character): void {
    this.showModal = true
    this.selectedCharacter = c;
  }

  toggleFavouriteCharacter(c: Character) {
    if (this.favouriteCharacters.some(fv => fv.id === c.id)) {
      this.favouriteCharacters = this.favouriteCharacters.filter(favouriteC => favouriteC.id !== c.id);
    }
    else{
      this.favouriteCharacters.push(c);
    }
  }

}
