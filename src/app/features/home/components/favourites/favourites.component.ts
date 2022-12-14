import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'rickmortyapi/dist/interfaces';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent {
  @Input() favouriteCharacters: Character[] = [];
}
